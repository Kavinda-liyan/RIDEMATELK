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

    # Convert vehicleId to string to match vehicle _id
    df["vehicleId"] = df["vehicleId"].astype(str)
    
    return df.groupby("vehicleId")["rating"].mean().to_dict()


#  VEHICLE DATAFRAME
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

    df["Seating Capacity"] = pd.to_numeric(df.get("Seating Capacity", pd.Series()), errors="coerce")
    df["EFF (km/l)/(km/kwh)"] = pd.to_numeric(df.get("EFF (km/l)/(km/kwh)", pd.Series()), errors="coerce")
    df["Ground Clearance (range)"] = pd.to_numeric(df.get("Ground Clearance (range)", pd.Series()), errors="coerce")

    return df


# RECOMMENDATION ENGINE
def generate_recommendations(user_prefs, top_n=30, knn_k=30):
    try:
        vehicles = list(vehicle_col.find())
        if not vehicles:
            return []

        vehicle_ratings = load_vehicle_ratings()
        baseline_rating = 2.5  

        df = build_dataframe(vehicles)

        # --- User preferences ---
        user_body = user_prefs.get("body", "").lower().strip()
        user_seating = int(user_prefs.get("seating", 5))
        user_road = user_prefs.get("road", "city").lower().strip()
        user_traffic = user_prefs.get("traffic", "mixed").lower().strip()
        user_fuel = user_prefs.get("fuel", "petrol").lower().strip()
        user_road_mapped = ROAD_MAPPING.get(user_road, "City/Urban").lower()

        # --- Filter vehicles ---
        df_filtered = df.dropna(subset=["Seating Capacity", "Fuel Type", "Body Type"]).copy()

        if user_body:
            df_filtered = df_filtered[df_filtered["Body Type"].str.contains(user_body, na=False)]
        
        if user_fuel:
            df_filtered=df_filtered[df_filtered["Fuel Type"] == user_fuel]

        df_filtered = df_filtered[
            df_filtered["Seating Capacity"].between(user_seating - 1, user_seating + 1, inclusive="both")
        ]

        if df_filtered.shape[0] == 0:
            return []

        numeric_features = ["Seating Capacity", "EFF (km/l)/(km/kwh)", "Ground Clearance (range)"]
        categorical_features = ["Fuel Type", "Body Type", "Road Type"]

        for col in numeric_features:
            median = df_filtered[col].median(skipna=True)
            df_filtered[col] = df_filtered[col].fillna(median if not np.isnan(median) else 0)

        preprocessor = ColumnTransformer(
            transformers=[
                ("num", StandardScaler(), numeric_features),
                ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features),
            ],
            remainder="drop",
        )

        X = preprocessor.fit_transform(df_filtered[numeric_features + categorical_features])

        FEATURE_WEIGHTS = {
            "Seating Capacity": 1.0,
            "EFF (km/l)/(km/kwh)": 1.0,
            "Ground Clearance (range)": 1.0,
            "Fuel Type": 1.5,
            "Body Type": 1.5,
            "Road Type": 1.0
        }

        if user_road_mapped == "off-road/hilly terrain":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 3.0
        elif user_road_mapped == "mid off-road":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 1.5

        if user_traffic == "high":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 5.0
        elif user_traffic == "medium":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 2.0
        elif user_traffic == "mixed":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 1.5

        for i, col in enumerate(numeric_features):
            X[:, i] *= FEATURE_WEIGHTS[col]

        cat_start = len(numeric_features)
        for i, col in enumerate(categorical_features):
            n_cols = len(preprocessor.named_transformers_["cat"].categories_[i])
            X[:, cat_start:cat_start + n_cols] *= FEATURE_WEIGHTS[col]
            cat_start += n_cols

        effective_k = X.shape[0]
        knn = NearestNeighbors(n_neighbors=effective_k, metric="euclidean")
        knn.fit(X)

        user_row = {
            "Seating Capacity": user_seating,
            "EFF (km/l)/(km/kwh)": df_filtered["EFF (km/l)/(km/kwh)"].median(skipna=True) or 0,
            "Ground Clearance (range)": df_filtered["Ground Clearance (range)"].median(skipna=True) or 0,
            "Fuel Type": user_fuel,
            "Body Type": user_body if user_body else df_filtered["Body Type"].mode().iloc[0],
            "Road Type": user_road_mapped,
        }

        user_df = pd.DataFrame([user_row])
        user_df = user_df[numeric_features + categorical_features]

        user_X = preprocessor.transform(user_df)

        for i, col in enumerate(numeric_features):
            user_X[:, i] *= FEATURE_WEIGHTS[col]

        cat_start = len(numeric_features)
        for i, col in enumerate(categorical_features):
            n_cols = len(preprocessor.named_transformers_["cat"].categories_[i])
            user_X[:, cat_start:cat_start + n_cols] *= FEATURE_WEIGHTS[col]
            cat_start += n_cols

        distances, indices = knn.kneighbors(user_X)

        idx_list = indices[0].tolist()
        distances_list = distances[0].tolist()
        recommendations = []
        filtered_records = df_filtered.reset_index(drop=True)

        for rank, (idx, dist) in enumerate(zip(idx_list, distances_list)):
            record = filtered_records.iloc[idx].to_dict()
            veh_id = str(record.get("_id"))

            #  AI Rating: Predict / fallback
            predicted_rating = float(vehicle_ratings.get(veh_id, baseline_rating))
            predicted_rating = max(1.0, min(predicted_rating, 5.0))

            #  AI Score: Rating + Distance
            final_score = (0.7 * predicted_rating) + (0.3 * (1 / (1 + dist)))

            rec = {
                "id": veh_id,
                **{k: (None if pd.isna(record.get(k, None)) else record.get(k, None)) for k in OUTPUT_COLS},
                "gallery_img": safe_value(record.get("gallery_img", None)),
                "rating": predicted_rating,
                "score": final_score,
                "_distance": float(dist),
            }

            recommendations.append(rec)

        #  Sort by AI score
        recommendations = sorted(recommendations, key=lambda x: x["score"], reverse=True)

        return recommendations[:top_n]

    except Exception as e:
        return {"error": str(e)}


# MAIN 

if __name__ == "__main__":
    try:
        user_prefs_json = sys.stdin.read()
        if not user_prefs_json:
            print(json.dumps({"error": "No user preference JSON provided."}))
            sys.exit(1)

        user_prefs = json.loads(user_prefs_json)
        recommendations = generate_recommendations(user_prefs, top_n=20, knn_k=10)
        print(json.dumps({"recommendations": recommendations}, default=str))

    except Exception as e:
        print(json.dumps({"error": f"Recommendation generation failed: {str(e)}"}))
        sys.exit(1)
