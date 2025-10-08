import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import sys
import os
from pymongo import MongoClient 

# --- Configuration and Constants (Derived from your model) ---

NUMERIC_COLS = ['Seating Capacity', 'EFF (km/l)/(km/kwh)', 'Ground Clearance (range)']
BODY_TYPES = [
    "sedan","hatchback","suv","mpv","pickup","coupe",
    "convertible","wagon","van","crossover","kei / microvan",
    "roadster","other","liftback","mpv / minivan"
]
ROAD_COLS = ['City/Urban', "Suburban/Normal", "Mid Off-Road", "Off-Road/Hilly Terrain"]
# Weights are fixed but size depends on number of fuel types
WEIGHT_BODY = 3.5
WEIGHT_NUMERIC = 3.5
WEIGHT_ROAD = 3
WEIGHT_EFF_GC = 3.5
WEIGHT_FUEL = 15


def load_data_and_extract_features():
    """Loads data from MongoDB and performs all preprocessing steps."""
    try:
        # --- 1. DATA EXTRACTION (MongoDB Connection) ---
        
        # Pull connection details from environment variables
        MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
        DB_NAME = os.environ.get("MONGO_DB_NAME", "ridematelk")
        COLLECTION_NAME = os.environ.get("MONGO_COLLECTION_NAME", "vehicledata")

        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]

        # Fetch all documents and load into a list, then into a DataFrame
        cursor = collection.find({})
        data_list = list(cursor)
        df = pd.DataFrame(data_list)
        
        # Clean up the MongoDB ID column which is not needed for training
        if '_id' in df.columns:
            df = df.drop(columns=['_id'])
            
        print(f"Successfully loaded {len(df)} documents from MongoDB.")
        
    except Exception as e:
        # Use print to send error messages back to the Node.js process (STDERR)
        print(f"Error loading data from MongoDB: {e}", file=sys.stderr)
        sys.exit(1)
        
    # --- 2. NUMERIC PREPROCESSING ---
    for col in NUMERIC_COLS:
        # Use .get() defensively as some records might miss a column
        df[col] = pd.to_numeric(df.get(col, np.nan), errors='coerce') 
    
    # Fill missing numeric values with the column mean
    df[NUMERIC_COLS] = df[NUMERIC_COLS].fillna(df[NUMERIC_COLS].mean())
    
    # --- 3. FEATURE ENGINEERING (OHE) ---
    df['Fuel Type'] = df['Fuel Type'].str.lower().str.strip()
    # Filter fuel types that aren't empty strings (in case of bad data)
    fuel_types = df['Fuel Type'].unique().tolist()
    fuel_types = [f for f in fuel_types if f] 
    
    for bt in BODY_TYPES:
        df[f'Body_{bt}'] = df['Body Type'].apply(
            lambda x: 1 if bt.lower() in [t.strip().lower() for t in str(x).replace('/', ',').split(',')] else 0
        )
    for f in fuel_types:
        df[f'Fuel_{f}'] = df['Fuel Type'].apply(lambda x: 1 if x == f else 0)
    
    # Ensure road columns exist (though not strictly necessary for OHE data)
    for rc in ROAD_COLS:
        if rc not in df.columns:
            df[rc] = 0

    return df, fuel_types


def preprocess_and_train(df, fuel_types):
    """Scales, weights, and trains the K-NN model."""
    
    ALL_FUEL_COLS = [f'Fuel_{f}' for f in fuel_types]
    FEATURE_COLS = ([f'Body_{bt}' for bt in BODY_TYPES] + 
                    ['Seating Capacity'] + ROAD_COLS + 
                    ['EFF (km/l)/(km/kwh)', 'Ground Clearance (range)'] + 
                    ALL_FUEL_COLS)

    X_full = df[FEATURE_COLS].fillna(0).values
    
    # 1. SCALING NUMERIC FEATURES (Seating, EFF, GC)
    
    # Find indices for the 3 numeric columns within the feature_cols list
    num_indices = [FEATURE_COLS.index(col) for col in NUMERIC_COLS if col in FEATURE_COLS]
    X_numeric_data = X_full[:, num_indices]
    
    scaler = StandardScaler()
    X_numeric_scaled = scaler.fit_transform(X_numeric_data)
    
    # Reassemble X_model with scaled features inserted back
    X_model = X_full.copy()
    for i, col_idx in enumerate(num_indices):
        X_model[:, col_idx] = X_numeric_scaled[:, i]

    # 2. FEATURE WEIGHTING (Must match the structure of FEATURE_COLS)
    weights = []
    weights += [WEIGHT_BODY] * len(BODY_TYPES) # Body Type
    weights.append(WEIGHT_NUMERIC) # Seating Capacity
    weights += [WEIGHT_ROAD] * len(ROAD_COLS) # Road Type
    weights += [WEIGHT_EFF_GC, WEIGHT_EFF_GC] # EFF, Ground Clearance
    weights += [WEIGHT_FUEL] * len(fuel_types) # Fuel Type
    weights = np.array(weights)
    
    X_weighted = X_model * weights

    # 3. TRAIN K-NN MODEL
    print("Training Weighted NearestNeighbors model...")
    top_n = min(100, len(X_weighted))
    knn = NearestNeighbors(n_neighbors=top_n, metric='euclidean')
    knn.fit(X_weighted)
    
    return scaler, knn, FEATURE_COLS, weights


def save_artifacts(scaler, knn_model, feature_cols, weights, df):
    """Saves all artifacts to disk."""
    print("Saving artifacts...")
    joblib.dump(scaler, 'scaler.joblib')
    joblib.dump(knn_model, 'knn_model.joblib')
    joblib.dump(feature_cols, 'feature_cols.joblib')
    joblib.dump(weights, 'weights.joblib')
    
    # Save essential metadata including indices
    metadata_cols = ['Manufacturer', 'Model', 'Body Type', 'Seating Capacity', 'Fuel Type', 'EFF (km/l)/(km/kwh)', 'Ground Clearance (range)']
    metadata_df = df[[c for c in metadata_cols if c in df.columns]].copy()
    joblib.dump(metadata_df, 'vehicle_metadata.joblib')
    
    print("Model, Scaler, and Metadata saved successfully.")


if __name__ == "__main__":
    print("--- Starting ML Model Retraining Job ---")

    df, fuel_types = load_data_and_extract_features()
    
    # Handle edge case where the database is empty (no training data)
    if df.empty or len(df) < 5:
        print("WARNING: Database is empty or too small (less than 5 records). Skipping training.")
        sys.exit(0) # Exit successfully but do not proceed with training/saving
    
    # 3. Preprocess, Train, and Get Artifacts
    scaler, knn_model, feature_cols, weights = preprocess_and_train(df, fuel_types)

    # 4. Save Artifacts
    save_artifacts(scaler, knn_model, feature_cols, weights, df)
    
    print("--- Retraining Job Finished ---")
