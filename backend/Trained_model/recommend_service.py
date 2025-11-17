import json
import sys
import math
from pymongo import MongoClient
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import NearestNeighbors

# --- MongoDB Connection ---
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "ridematelk"
COLLECTION_NAME = "vehicledata"

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    vehicle_col = db[COLLECTION_NAME]
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

def generate_recommendations(user_prefs, top_n=30, knn_k=30):
    try:
        vehicles = list(vehicle_col.find())
        if not vehicles:
            return []

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
        
        # Filter by body type if provided
        if user_body:
            df_filtered = df_filtered[df_filtered["Body Type"].str.contains(user_body, na=False)]
        
        # Filter by seating
        df_filtered = df_filtered[df_filtered["Seating Capacity"].between(user_seating - 1, user_seating + 1, inclusive="both")]
        
       

        # # High traffic: filter high efficiency vehicles
        # if user_traffic == "high":
        #     median_eff = df_filtered["EFF (km/l)/(km/kwh)"].median(skipna=True)
        #     df_filtered = df_filtered[df_filtered["EFF (km/l)/(km/kwh)"] >= median_eff]

        if df_filtered.shape[0] == 0:
            return []

        numeric_features = ["Seating Capacity", "EFF (km/l)/(km/kwh)", "Ground Clearance (range)"]
        categorical_features = ["Fuel Type", "Body Type", "Road Type"]

        # Fill numeric missing values
        for col in numeric_features:
            median = df_filtered[col].median(skipna=True)
            df_filtered[col] = df_filtered[col].fillna(median if not np.isnan(median) else 0)

        # Column transformer
        preprocessor = ColumnTransformer(
            transformers=[
                ("num", StandardScaler(), numeric_features),
                ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features),
            ],
            remainder="drop",
        )

        X = preprocessor.fit_transform(df_filtered[numeric_features + categorical_features])

        # Feature weights
        FEATURE_WEIGHTS = {"Seating Capacity": 1.0, "EFF (km/l)/(km/kwh)": 1.0, "Ground Clearance (range)": 1.0,
                           "Fuel Type": 1.0, "Body Type": 1.0, "Road Type": 1.0}
        if user_road_mapped == "off-road/hilly terrain":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 3.0
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"]=1.0
        elif user_road_mapped == "mid off-road":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 1.5
        elif user_road_mapped=="suburban/normal":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 1.2
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"]=1.5
        elif user_road_mapped == "city/urban":
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 1.0
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"]=1.8
            FEATURE_WEIGHTS["Fuel Type"]=1.2
        

        if user_traffic == "high":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 5.0
            FEATURE_WEIGHTS["Ground Clearance (range)"] = 0.8
        elif user_traffic == "medium":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 2.0
        elif user_traffic == "low":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 1.0
        elif user_traffic == "mixed":
            FEATURE_WEIGHTS["EFF (km/l)/(km/kwh)"] = 1.5

        # Apply feature weights
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

        # --- User vector ---
        user_row = {
            "Seating Capacity": user_seating,
            "EFF (km/l)/(km/kwh)": df_filtered["EFF (km/l)/(km/kwh)"].median(skipna=True) or 0,
            "Ground Clearance (range)": df_filtered["Ground Clearance (range)"].median(skipna=True) or 0,
            "Fuel Type": user_fuel,
            "Body Type": user_body if user_body else (df_filtered["Body Type"].mode().iloc[0] if not df_filtered["Body Type"].mode().empty else ""),
            "Road Type": user_road_mapped,
        }

        user_df = pd.DataFrame([user_row])
        user_df = user_df[numeric_features + categorical_features]
        for col in numeric_features:
            if pd.isna(user_df.loc[0, col]):
                user_df.loc[0, col] = df_filtered[col].median(skipna=True) or 0

        user_X = preprocessor.transform(user_df)
        for i, col in enumerate(numeric_features):
            user_X[:, i] *= FEATURE_WEIGHTS[col]
        cat_start = len(numeric_features)
        for i, col in enumerate(categorical_features):
            n_cols = len(preprocessor.named_transformers_["cat"].categories_[i])
            user_X[:, cat_start:cat_start + n_cols] *= FEATURE_WEIGHTS[col]
            cat_start += n_cols

        distances, indices = knn.kneighbors(user_X)

        # --- Build recommendations ---
        idx_list = indices[0].tolist()
        distances_list = distances[0].tolist()
        recommendations = []
        filtered_records = df_filtered.reset_index(drop=True)

        for rank, (idx, dist) in enumerate(zip(idx_list, distances_list)):
            record = filtered_records.iloc[idx].to_dict()
            rec = {
                "id": str(record.get("_id")),
                **{k: (None if pd.isna(record.get(k, None)) else record.get(k, None)) for k in OUTPUT_COLS},
                "gallery_img": safe_value(record.get("gallery_img", None))
            }
            rec["_distance"] = float(dist)
            rec["_rank"] = rank + 1
            for k, v in rec.items():
                if isinstance(v, (np.integer, np.floating)):
                    rec[k] = safe_value(float(v))
            recommendations.append(rec)

        # return recommendations[:top_n]
        return recommendations

    except Exception as e:
        return {"error": str(e)}

# --- Main Execution Block ---
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
