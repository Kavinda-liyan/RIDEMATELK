import pandas as pd
import numpy as np
import joblib
from pymongo import MongoClient
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import sys
import os

# --- 1. Configuration and Constants ---
# NOTE: This should pull from environment variables set in your Node.js application
# For local testing, ensure these match your .env file
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = 'vehicleDB'       # Ensure this matches your Mongoose connection DB name
COLLECTION_NAME = 'vehicles' # Ensure this matches your Mongoose collection name

# Feature definitions MUST match your original training script
NUMERIC_COLS = ['Seating Capacity', 'EFF (km/l)/(km/kwh)', 'Ground Clearance (range)']
BODY_TYPES = [
    "sedan", "hatchback", "suv", "mpv", "pickup", "coupe",
    "convertible", "wagon", "van", "crossover", "kei / microvan",
    "roadster", "other", "liftback", "mpv / minivan"
]
ROAD_COLS = ['City/Urban', "Suburban/Normal", "Mid Off-Road", "Off-Road/Hilly Terrain"]
# Feature weighting (MUST be the same as used for distance calculation!)
WEIGHTS = np.array(
    [3.5] * len(BODY_TYPES) +  # Body Type
    [3.5] * len(NUMERIC_COLS) + # Seating Capacity, EFF, Ground Clearance
    [3] * len(ROAD_COLS) +     # Road Type
    [15] * 20                  # Placeholder for Fuel Type weights (assuming max 20 fuel types)
)


def connect_and_extract_data():
    """Connects to MongoDB and extracts the latest vehicle data."""
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        
        # Fetch all documents and convert them to a list of dictionaries
        data_list = list(collection.find({}))
        
        if not data_list:
            print("Error: Database collection is empty. Retraining skipped.")
            sys.exit(1)
            
        # Convert to DataFrame
        df = pd.DataFrame(data_list)
        
        # Drop the MongoDB '_id' before feature engineering but save the series for later
        df['_id_str'] = df['_id'].astype(str)
        df.drop(columns=['_id'], inplace=True, errors='ignore')
        
        return df

    except Exception as e:
        print(f"Error connecting to MongoDB or extracting data: {e}")
        sys.exit(1)


def preprocess_and_train(df):
    """Performs full feature engineering, trains K-NN, and returns artifacts."""
    print("Starting data preprocessing...")
    
    # --- 2. Data Cleaning and Imputation ---
    for col in NUMERIC_COLS:
        df[col] = pd.to_numeric(df.get(col, np.nan), errors='coerce')
    df[NUMERIC_COLS] = df[NUMERIC_COLS].fillna(df[NUMERIC_COLS].mean())
    
    # --- 3. Feature Engineering (One-Hot Encoding) ---
    df['Fuel Type'] = df['Fuel Type'].str.strip().str.lower()
    fuel_types = df['Fuel Type'].unique().tolist()
    
    # Body Type OHE
    for bt in BODY_TYPES:
        df[f'Body_{bt}'] = df['Body Type'].apply(
            lambda x: 1 if bt.lower() in [t.strip().lower() for t in str(x).replace('/', ',').split(',')] else 0
        )
    # Fuel Type OHE
    for f in fuel_types:
        df[f'Fuel_{f}'] = df['Fuel Type'].apply(lambda x: 1 if x == f else 0)
        
    # Ensure all ROAD_COLS exist (set to 0 if not present in input)
    for rc in ROAD_COLS:
        if rc not in df.columns:
            df[rc] = 0

    # --- 4. Final Feature Matrix Construction ---
    ALL_FUEL_COLS = [f'Fuel_{f}' for f in fuel_types]
    FEATURE_COLS = [f'Body_{bt}' for bt in BODY_TYPES] + NUMERIC_COLS + ROAD_COLS + ALL_FUEL_COLS
    
    X = df[FEATURE_COLS].fillna(0).values
    
    # --- 5. Scaling Numeric Features ---
    start_idx = len(BODY_TYPES)
    end_idx = start_idx + len(NUMERIC_COLS)

    scaler = StandardScaler()
    X_numeric_scaled = scaler.fit_transform(X[:, start_idx:end_idx])
    
    # Recombine features
    X_model = np.hstack([X[:, :start_idx], X_numeric_scaled, X[:, end_idx:]])
    
    # --- 6. Apply Feature Weighting and Train Model ---
    
    # Adjust weights array size to match the number of features dynamically generated
    current_weights = np.concatenate([
        WEIGHTS[:len(BODY_TYPES) + len(NUMERIC_COLS) + len(ROAD_COLS)],
        [15] * len(ALL_FUEL_COLS)
    ])
    
    X_weighted = X_model * current_weights
    
    print("Training Weighted NearestNeighbors model...")
    top_n = min(100, len(X_weighted))
    knn = NearestNeighbors(n_neighbors=top_n, metric='euclidean')
    knn.fit(X_weighted)
    
    return scaler, knn, FEATURE_COLS, df, current_weights


def save_artifacts(scaler, knn_model, feature_cols, df, weights):
    """Saves the trained model, scaler, and metadata to disk."""
    
    # --- 7. Save Artifacts (Deployment Step) ---
    joblib.dump(scaler, 'scaler.joblib')
    joblib.dump(knn_model, 'knn_model.joblib')
    joblib.dump(feature_cols, 'feature_cols.joblib')
    joblib.dump(weights, 'weights.joblib') # Save weights as they are dynamic based on fuel types
    
    # Save essential vehicle metadata for quick lookups by the recommendation service
    metadata_cols = ['_id_str', 'Manufacturer', 'Model', 'Body Type', 'Seating Capacity', 
                     'Fuel Type', 'EFF (km/l)/(km/kwh)', 'Ground Clearance (range)']
                     
    metadata_df = df[[c for c in metadata_cols if c in df.columns]].copy()
    joblib.dump(metadata_df, 'vehicle_metadata.joblib')
    
    print("✅ Model, Scaler, and Metadata saved successfully.")


if __name__ == "__main__":
    print("--- Starting ML Model Retraining Job ---")

    # 1. Extract Data
    latest_df = connect_and_extract_data()

    # 2. Preprocess and Train
    scaler, knn_model, feature_cols, metadata_df, weights = preprocess_and_train(latest_df)

    # 3. Save Artifacts
    save_artifacts(scaler, knn_model, feature_cols, metadata_df, weights)
    
    print("--- Retraining Job Finished ---")