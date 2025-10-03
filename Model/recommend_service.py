import joblib
import pandas as pd
import numpy as np
import json
import sys
import os

# --- 1. Load Artifacts and Constants ---
try:
    # Load the trained model and features saved by the retraining script
    KNN_MODEL = joblib.load('knn_model.joblib')
    SCALER = joblib.load('scaler.joblib')
    FEATURE_COLS = joblib.load('feature_cols.joblib')
    WEIGHTS = joblib.load('weights.joblib') 
    
    # Load the vehicle metadata for final output mapping
    METADATA_DF = joblib.load('vehicle_metadata.joblib')
    
except Exception as e:
    # Exit if loading fails, Node.js will catch this error
    sys.exit(f"Error loading model artifacts: {e}")


# --- 2. Feature Definitions (Must match the training script) ---

# Indices for numeric features within the FEATURE_COLS list
NUMERIC_COLS = ['Seating Capacity', 'EFF (km/l)/(km/kwh)', 'Ground Clearance (range)']
BODY_TYPES = [
    "sedan", "hatchback", "suv", "mpv", "pickup", "coupe",
    "convertible", "wagon", "van", "crossover", "kei / microvan",
    "roadster", "other", "liftback", "mpv / minivan"
]
ROAD_COLS = ['City/Urban', "Suburban/Normal", "Mid Off-Road", "Off-Road/Hilly Terrain"]
# Fuel Types are derived dynamically from the FEATURE_COLS

ROAD_MAPPING = {
    "town": "City/Urban", "urban": "City/Urban", "city": "City/Urban",
    "suburban": "Suburban/Normal", "mid off-road": "Mid Off-Road",
    "off-road": "Off-Road/Hilly Terrain", "hilly": "Off-Road/Hilly Terrain"
}

# --- 3. Core Prediction Function ---

def generate_recommendations(user_prefs):
    """
    Takes user preferences, converts them to a weighted vector, 
    runs K-NN, and applies hybrid filtering/sorting.
    """
    # --- Input Processing and Feature Construction ---
    
    # Extract raw user inputs (passed as dictionary from Node.js)
    user_body = user_prefs.get('body').lower().strip()
    user_seating = int(user_prefs.get('seating'))
    user_road = user_prefs.get('road').lower().strip()
    user_traffic = user_prefs.get('traffic').lower().strip()
    user_fuel = user_prefs.get('fuel').lower().strip()
    
    user_road_mapped = ROAD_MAPPING.get(user_road, "City/Urban")

    # --- Adaptive Fuel Preference (Rule-Based Logic 1) ---
    if user_traffic == "high":
        preferred_fuels = ["electric","hybrid","petrol","diesel"]
    elif user_traffic == "mixed":
        preferred_fuels = ["hybrid","petrol","electric","diesel"]
    elif user_traffic == "mid":
        preferred_fuels = ["hybrid","petrol","diesel","electric"]
    else:
        preferred_fuels = ["petrol","diesel","hybrid","electric"]
    
    # Adjust list: user's choice first, followed by adaptive priority
    user_fuel_list = [user_fuel]
    combined_fuels = user_fuel_list + [f for f in preferred_fuels if f not in user_fuel_list]
    final_preferred_fuels = list(dict.fromkeys(combined_fuels))

    # --- Filtering (Rule-Based Logic 2) ---
    
    # 1. Filter by Fuel and Body Type (Required features must be present in METADATA_DF)
    filtered_df = METADATA_DF[
        METADATA_DF['Fuel Type'].str.lower().isin(final_preferred_fuels)
    ].copy()
    
    if f'Body_{user_body}' in FEATURE_COLS:
        # NOTE: We must check if the body type exists in the filtered features
        # For simplicity here, we assume the saved metadata contains all necessary columns.
        # A more robust solution involves re-running the OHE on the metadata or filtering
        # the metadata by Body Type string before proceeding.
        
        # Simple string-based filter as a fallback for the model's feature filtering:
        filtered_df = filtered_df[filtered_df['Body Type'].str.contains(user_body, case=False, na=False)]

    # 2. Filter by Seating Capacity (±1)
    filtered_df = filtered_df[
        filtered_df['Seating Capacity'].apply(lambda x: abs(x - user_seating) <= 1)
    ].copy()

    if filtered_df.empty:
        return [] # No matches found after strict filtering

    # --- K-NN User Vector Construction ---
    
    # 1. Calculate Imputed Numeric Values (from original script)
    # NOTE: In a production setting, these values should ideally be derived from a 
    # configuration file or saved artifact, not recalculated from scratch.
    df_eff_mean = METADATA_DF['EFF (km/l)/(km/kwh)'].mean()
    df_gc_mean = METADATA_DF['Ground Clearance (range)'].mean()
    df_gc_max = METADATA_DF['Ground Clearance (range)'].max()
    
    traffic_eff_map = {
        "high": METADATA_DF['EFF (km/l)/(km/kwh)'].quantile(0.45),
        "mixed": METADATA_DF['EFF (km/l)/(km/kwh)'].quantile(0.55),
        "mid": METADATA_DF['EFF (km/l)/(km/kwh)'].quantile(0.5),
        "low": METADATA_DF['EFF (km/l)/(km/kwh)'].quantile(0.7)
    }
    
    fuel_efficiency = traffic_eff_map.get(user_traffic, df_eff_mean)
    ground_clearance = df_gc_max if user_road in ["off-road", "mid off-road", "hilly"] else df_gc_mean

    numeric_input = np.array([[user_seating, fuel_efficiency, ground_clearance]])
    
    # 2. Scale Numeric Features
    numeric_scaled = SCALER.transform(numeric_input)[0]

    # 3. Build Full Unscaled/Unweighted Feature Vector
    user_vector_dict = {}
    
    # OHE and Road features (all set to 0 initially)
    for col in FEATURE_COLS:
        user_vector_dict[col] = 0
        
    # Set positive OHE values
    if f'Body_{user_body}' in user_vector_dict:
        user_vector_dict[f'Body_{user_body}'] = 1
    if f'Fuel_{user_fuel}' in user_vector_dict:
        user_vector_dict[f'Fuel_{user_fuel}'] = 1
    if user_road_mapped in user_vector_dict:
        user_vector_dict[user_road_mapped] = 1

    # Insert Scaled Numeric values
    user_vector_dict['Seating Capacity'] = numeric_scaled[0]
    user_vector_dict['EFF (km/l)/(km/kwh)'] = numeric_scaled[1]
    user_vector_dict['Ground Clearance (range)'] = numeric_scaled[2]
    
    # Reorder and convert to numpy array
    user_vector = np.array([user_vector_dict[col] for col in FEATURE_COLS])
    
    # 4. Apply Feature Weighting
    user_vector_weighted = user_vector * WEIGHTS
    
    # --- K-NN Query ---
    
    # Get indices (row numbers) of the filtered vehicles in the full metadata DF
    filtered_indices = filtered_df.index
    
    # Create the matrix for prediction: only vehicles that passed the filter
    X_filtered_for_knn = np.zeros((len(filtered_indices), len(FEATURE_COLS)))
    
    # Re-map filtered indices to the full model space to run prediction
    for i, idx in enumerate(filtered_indices):
        # NOTE: This assumes METADATA_DF is indexed by the original DF's index.
        # For MongoDB, this step is complex. Simplification: run KNN on ALL data, 
        # then filter results. Let's use the simpler, slightly less efficient method:
        pass # Sticking to the filtering approach used in the original script
    
    # **Simplified K-NN:** Run query against the full training set and map results
    distances, indices = KNN_MODEL.kneighbors([user_vector_weighted])
    
    # Map raw results back to the metadata
    raw_recommended = METADATA_DF.iloc[indices[0]].copy()
    raw_recommended['Distance'] = distances[0]
    
    # Filter the raw results by the rule-based filters (re-apply for certainty)
    raw_recommended['Fuel Type'] = raw_recommended['Fuel Type'].str.lower()
    final_recommended = raw_recommended[
        raw_recommended['Fuel Type'].isin(final_preferred_fuels)
    ].copy()
    final_recommended = final_recommended[
        final_recommended['Body Type'].str.contains(user_body, case=False, na=False)
    ]
    final_recommended = final_recommended[
        final_recommended['Seating Capacity'].apply(lambda x: abs(x - user_seating) <= 1)
    ]
    
    # --- Hybrid Sorting (Rule-Based Logic 3) ---
    
    # Fuel Priority: index in the preferred list (lower index is higher priority)
    final_recommended['Fuel_Priority'] = final_recommended['Fuel Type'].apply(
        lambda f: final_preferred_fuels.index(f) if f in final_preferred_fuels else len(final_preferred_fuels)
    )
    # Seat Priority: exact match is best (0)
    final_recommended['Seat_Priority'] = final_recommended['Seating Capacity'].apply(lambda s: 0 if s == user_seating else 1)

    # Final Sort: 1. Fuel order, 2. KNN distance, 3. Seat match
    final_recommended.sort_values(by=['Fuel_Priority','Distance','Seat_Priority'], inplace=True)
    
    # --- Final Output Formatting ---
    output_cols = ['Manufacturer','Model','Body Type','Seating Capacity','Fuel Type','EFF (km/l)/(km/kwh)','Ground Clearance (range)','Distance']
    
    results = final_recommended[output_cols].head(10).to_dict(orient='records')
    
    return results

# --- 4. Main Execution Block (for Node.js communication) ---
if __name__ == "__main__":
    
    # Get the raw user input vector from the command line argument (or STDIN)
    if len(sys.argv) < 2:
        # Exit with JSON error for Node.js to handle
        print(json.dumps({"error": "No user preference JSON provided."}))
        sys.exit(1)
        
    try:
        # Input is a JSON string of the user preferences (e.g., {'body': 'hatchback', 'seating': 5, ...})
        user_prefs_json = sys.argv[1]
        user_prefs = json.loads(user_prefs_json)
        
        recommendations = generate_recommendations(user_prefs)
        
        # Print the final list of recommendations as a JSON string to STDOUT
        print(json.dumps({"recommendations": recommendations}))
        
    except Exception as e:
        # Catch any runtime errors during prediction and report as JSON
        print(json.dumps({"error": f"Recommendation generation failed: {str(e)}"}))
        sys.exit(1)