import json
import sys
import os
import math
import joblib
import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import NearestNeighbors

# ------------------ MongoDB Connection ------------------

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = os.environ.get("MONGO_DB_NAME", "ridematelk")
COLLECTION_NAME = os.environ.get("MONGO_COLLECTION_NAME", "vehicledata")

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    vehicle_col = db[COLLECTION_NAME]
except Exception as e:
    print(json.dumps({"error": f"MongoDB connection failed: {str(e)}"}))
    sys.exit(1)

# ------------------ Constants ------------------

NUMERIC_COLS = [
    "Seating Capacity",
    "EFF (km/l)/(km/kwh)",
    "Ground Clearance (range)",
]

CATEGORICAL_COLS = [
    "Fuel Type",
    "Body Type",
    "Road Type",
]

OUTPUT_COLS = [
    "Manufacturer",
    "Model",
    "Body Type",
    "Seating Capacity",
    "Fuel Type",
    "EFF (km/l)/(km/kwh)",
    "Ground Clearance (range)",
]

# Keep consistent road mapping
ROAD_MAPPING = {
    "town": "City/Urban",
    "urban": "City/Urban",
    "city": "City/Urban",
    "suburban": "Suburban/Normal",
    "mid off-road": "Mid Off-Road",
    "off-road": "Off-Road/Hilly Terrain",
    "hilly": "Off-Road/Hilly Terrain",
}

# ------------------ Helper Functions ------------------

def load_dataframe():
    vehicles = list(vehicle_col.find())
    if not vehicles:
        return pd.DataFrame()

    df = pd.DataFrame(vehicles)

    if "_id" in df.columns:
        df = df.drop(columns=["_id"])

    # ensure all needed columns exist
    for col in OUTPUT_COLS:
        if col not in df.columns:
            df[col] = np.nan

    # clean string columns
    for col in CATEGORICAL_COLS:
        if col in df.columns:
            df[col] = df[col].astype(str).fillna("").str.lower().str.strip()
        else:
            df[col] = ""

    # convert numeric columns
    for col in NUMERIC_COLS:
        df[col] = pd.to_numeric(df.get(col, pd.Series(dtype=float)), errors="coerce")

    # fill missing numeric with median
    for col in NUMERIC_COLS:
        med = df[col].median(skipna=True)
        df[col] = df[col].fillna(med if not np.isnan(med) else 0)

    return df


def train_knn(df):
    """
    Creates ColumnTransformer → preprocess features → trains KNN.
    Saves:
        - knn_model.joblib
        - preprocessor.joblib
        - feature_columns.joblib
        - metadata.joblib
    """
    if df.empty:
        print(json.dumps({"error": "Empty dataset — cannot train"}))
        sys.exit(0)

    # Create preprocessor
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), NUMERIC_COLS),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), CATEGORICAL_COLS),
        ],
        remainder="drop",
    )

    feature_df = df[NUMERIC_COLS + CATEGORICAL_COLS]

    X = preprocessor.fit_transform(feature_df)

    # neighbors limited to dataset size
    k = min(50, len(df))
    knn = NearestNeighbors(n_neighbors=k, metric="euclidean")
    knn.fit(X)

    # Save artifacts
    joblib.dump(knn, "knn_model.joblib")
    joblib.dump(preprocessor, "preprocessor.joblib")
    joblib.dump(NUMERIC_COLS + CATEGORICAL_COLS, "feature_columns.joblib")

    metadata_df = df[OUTPUT_COLS].copy()
    joblib.dump(metadata_df, "metadata.joblib")

    return True


# ------------------ Main ------------------

if __name__ == "__main__":
    try:
        print("Loading data from MongoDB...")
        df = load_dataframe()

        if df.empty or len(df) < 5:
            print(json.dumps({"error": "Not enough records to train (minimum 5)"}))
            sys.exit(0)

        print(f"Training model with {len(df)} vehicles...")
        train_knn(df)

        print(json.dumps({"status": "success", "message": "Retraining completed"}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
