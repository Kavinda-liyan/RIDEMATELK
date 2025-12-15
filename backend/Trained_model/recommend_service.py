import json
import sys
import math
from pymongo import MongoClient
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import NearestNeighbors
from bson import ObjectId

MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "ridematelk"
VEHICLE_COLLECTION = "vehicledata"
RATING_COLLECTION = "userratings"

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    vehicle_col = db[VEHICLE_COLLECTION]
    rating_col = db[RATING_COLLECTION]
except Exception as e:
    print(json.dumps({"error": f"MongoDB connection failed: {str(e)}"}))
    sys.exit(1)

# --- Constants ---
OUTPUT_COLS = [
    "Manufacturer",
    "Model",
    "Body Type",
    "Seating Capacity",
    "Fuel Type",
    "EFF (km/l)/(km/kwh)",
    "Ground Clearance (range)",
]

ROAD_MAPPING = {
    "town": "City/Urban",
    "urban": "City/Urban",
    "city": "City/Urban",
    "suburban": "Suburban/Normal",
    "mid off-road": "Mid Off-Road",
    "off-road": "Off-Road/Hilly Terrain",
    "hilly": "Off-Road/Hilly Terrain",
}

TRAFFIC_CATEGORIES = ["low", "medium", "high", "mixed"]

FUEL_PRIORITY = {"ev": 3, "hybrid": 2, "petrol": 1, "diesel": 1, "cng": 1}

def safe_value(val):
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return 0
    return val

# USER RATINGS
def load_vehicle_ratings():
    ratings = list(rating_col.find({}, {"vehicleId": 1, "rating": 1, "_id": 0}))
    if not ratings:
        return {}
    df = pd.DataFrame(ratings)
    df["rating"] = pd.to_numeric(df["rating"], errors="coerce").fillna(0)
    df["vehicleId"] = df["vehicleId"].astype(str)
    return df.groupby("vehicleId")["rating"].mean().to_dict()

# VEHICLE DATAFRAME
def build_dataframe(vehicles):
    df = pd.DataFrame(vehicles)
    for c in OUTPUT_COLS:
        if c not in df.columns:
            df[c] = np.nan
    for cat in ["Body Type", "Fuel Type", "Road Type"]:
        if cat in df.columns:
            df[cat] = df[cat].astype(str).fillna("").str.lower().str.strip()
        else:
            df[cat] = ""
    df["Seating Capacity"] = pd.to_numeric(df["Seating Capacity"], errors="coerce")
    df["EFF (km/l)/(km/kwh)"] = pd.to_numeric(df["EFF (km/l)/(km/kwh)"], errors="coerce")
    df["Ground Clearance (range)"] = pd.to_numeric(df["Ground Clearance (range)"], errors="coerce")
    return df

# RECOMMENDATION ENGINE
def generate_recommendations(user_prefs, top_n=30):
    try:
        vehicles = list(vehicle_col.find())
        if not vehicles:
            return {"recommendations": [], "accuracy_percent": 0}

        vehicle_ratings = load_vehicle_ratings()
        baseline_rating = 2.5
        df = build_dataframe(vehicles)

        # --- User preferences ---
        user_body = user_prefs.get("body", "").lower().strip()
        user_seating = int(user_prefs.get("seating", 5))
        user_road = user_prefs.get("road", "city").lower().strip()
        user_traffic = user_prefs.get("traffic", "mixed").lower().strip()
        user_fuel = user_prefs.get("fuel", "any").lower().strip()
        user_road_mapped = ROAD_MAPPING.get(user_road, "City/Urban").lower()

        # Validate traffic input
        if user_traffic not in TRAFFIC_CATEGORIES:
            user_traffic = "mixed"

        # Treat 'any' fuel as no preference
        if user_fuel == "any":
            user_fuel_filter = False
            user_fuel = ""
        else:
            user_fuel_filter = True

        # --- Filter vehicles ---
        df_filtered = df.dropna(subset=["Seating Capacity", "Body Type"]).copy()
        if user_body:
            df_filtered = df_filtered[df_filtered["Body Type"].str.contains(user_body, na=False)]
        if user_fuel_filter:
            df_filtered = df_filtered[df_filtered["Fuel Type"] == user_fuel]
        df_filtered = df_filtered[df_filtered["Seating Capacity"].between(user_seating - 1, user_seating + 1)]
        if df_filtered.empty:
            return {"recommendations": [], "accuracy_percent": 0}

        numeric_features = ["Seating Capacity", "EFF (km/l)/(km/kwh)", "Ground Clearance (range)"]
        categorical_features = ["Fuel Type", "Body Type", "Road Type"]

        for col in numeric_features:
            df_filtered[col] = df_filtered[col].fillna(df_filtered[col].median())

        preprocessor = ColumnTransformer(
            transformers=[
                ("num", StandardScaler(), numeric_features),
                ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features),
            ]
        )

        X = preprocessor.fit_transform(df_filtered[numeric_features + categorical_features])

        # --- Feature weights based on traffic and road ---
        FEATURE_WEIGHTS = {
            "Seating Capacity": 1.0,
            "EFF (km/l)/(km/kwh)": 1.5,
            "Ground Clearance (range)": 1.0,
            "Fuel Type": 1.5,
            "Body Type": 1.5,
            "Road Type": 1.0,
        }

        if user_road_mapped == "off-road/hilly terrain":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 3.0
        elif user_road_mapped == "mid off-road":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 1.5

        if user_traffic == "high":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 5.0
        elif user_traffic == "medium":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 2.0
        else:
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 1.5

        for i, col in enumerate(numeric_features):
            X[:, i] *= FEATURE_WEIGHTS[col]

        knn = NearestNeighbors(n_neighbors=len(X), metric="euclidean")
        knn.fit(X)

        user_row = {
            "Seating Capacity": user_seating,
            "EFF (km/l)/(km/kwh)": df_filtered["EFF (km/l)/(km/kwh)"].median(),
            "Ground Clearance (range)": df_filtered["Ground Clearance (range)"].median(),
            "Fuel Type": user_fuel or df_filtered["Fuel Type"].mode().iloc[0],
            "Body Type": user_body or df_filtered["Body Type"].mode().iloc[0],
            "Road Type": user_road_mapped,
        }

        user_X = preprocessor.transform(pd.DataFrame([user_row])[numeric_features + categorical_features])
        distances, indices = knn.kneighbors(user_X)

        recommendations = []
        records = df_filtered.reset_index(drop=True)
        for idx, dist in zip(indices[0], distances[0]):
            rec = records.iloc[idx].to_dict()
            veh_id = str(rec["_id"])
            rating = float(vehicle_ratings.get(veh_id, baseline_rating))
            rating = max(1.0, min(rating, 5.0))
            score = (0.7 * rating) + (0.3 * (1 / (1 + dist)))
            recommendations.append({
                "id": veh_id,
                **{k: rec.get(k) for k in OUTPUT_COLS},
                "gallery_img": safe_value(rec.get("gallery_img")),
                "rating": rating,
                "score": score,
                "_distance": float(dist),
            })

        # --- FINAL SORTING LOGIC ---
        if user_traffic == "high" and not user_fuel_filter:
            # Score first, then fuel priority, then fuel efficiency
            recommendations.sort(
                key=lambda x: (
                    x["score"],
                    FUEL_PRIORITY.get(x["Fuel Type"].lower(), 0),
                    x["EFF (km/l)/(km/kwh)"] or 0
                ),
                reverse=True
            )
        elif user_traffic == "high":
            # Score first, then fuel efficiency
            recommendations.sort(
                key=lambda x: (x["score"], x["EFF (km/l)/(km/kwh)"] or 0),
                reverse=True
            )
        elif user_road_mapped in ["off-road/hilly terrain", "mid off-road"]:
            # Score first, then ground clearance
            recommendations.sort(
                key=lambda x: (x["score"], x["Ground Clearance (range)"] or 0),
                reverse=True
            )
        elif user_road_mapped == "suburban/normal":
            gc_vals = [r["Ground Clearance (range)"] for r in recommendations if r["Ground Clearance (range)"]]
            gc_median = np.median(gc_vals) if gc_vals else 0
            recommendations.sort(
                key=lambda x: (x["score"], -abs((x["Ground Clearance (range)"] or gc_median) - gc_median)),
                reverse=True
            )
        else:
            recommendations.sort(key=lambda x: x["score"], reverse=True)

        # --- ACCURACY CALCULATION ---
        matched_count = 0
        for rec in recommendations:
            match_body = user_body in rec.get("Body Type", "").lower()
            match_seating = abs(rec.get("Seating Capacity", 0) - user_seating) <= 1
            match_fuel = True if not user_fuel_filter else rec.get("Fuel Type", "").lower() == user_fuel
            if match_body and match_seating and match_fuel:
                matched_count += 1

        accuracy_percent = (matched_count / len(recommendations) * 100) if recommendations else 0

        return {"recommendations": recommendations[:top_n], "accuracy_percent": round(accuracy_percent, 2)}

    except Exception as e:
        return {"error": str(e)}

# MAIN
if __name__ == "__main__":
    try:
        user_prefs = json.loads(sys.stdin.read())
        result = generate_recommendations(user_prefs, top_n=40)
        print(json.dumps(result, default=str))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
