# recommend_service.py (MongoDB Dynamic Version)
import json
import sys
import numpy as np
from pymongo import MongoClient

# --- MongoDB Connection ---
MONGO_URI = "mongodb://localhost:27017/"  # Update if using Atlas
DB_NAME = "ridematelk"
COLLECTION_NAME = "vehicledata"

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    vehicle_col = db[COLLECTION_NAME]
except Exception as e:
    sys.exit(f"MongoDB connection failed: {e}")

# --- Constants ---
NUMERIC_COLS = ['Seating Capacity', 'EFF (km/l)/(km/kwh)', 'Ground Clearance (range)']
BODY_TYPES = [
    "sedan","hatchback","suv","mpv","pickup","coupe",
    "convertible","wagon","van","crossover","kei / microvan",
    "roadster","other","liftback","mpv / minivan"
]
ROAD_MAPPING = {
    "town": "City/Urban", "urban": "City/Urban", "city": "City/Urban",
    "suburban": "Suburban/Normal", "mid off-road": "Mid Off-Road",
    "off-road": "Off-Road/Hilly Terrain", "hilly": "Off-Road/Hilly Terrain"
}

# --- Recommendation Logic ---
def generate_recommendations(user_prefs, top_n=100):
    try:
        # Fetch all vehicles from MongoDB
        vehicles = list(vehicle_col.find())
        if not vehicles:
            return []

        # Standardize user inputs
        user_body = user_prefs.get('body', '').lower().strip()
        user_seating = int(user_prefs.get('seating', 5))
        user_road = user_prefs.get('road', 'city').lower().strip()
        user_traffic = user_prefs.get('traffic', 'mixed').lower().strip()
        user_fuel = user_prefs.get('fuel', 'petrol').lower().strip()

        user_road_mapped = ROAD_MAPPING.get(user_road, "City/Urban")

        # Adaptive fuel preference based on traffic
        if user_traffic == "high":
            preferred_fuels = ["electric","hybrid","petrol","diesel"]
        elif user_traffic == "low":
            preferred_fuels = ["petrol","diesel","hybrid","electric"]
        else:
            preferred_fuels = ["hybrid","petrol","electric","diesel"]

        user_fuel_list = [user_fuel]
        final_preferred_fuels = list(dict.fromkeys(user_fuel_list + [f for f in preferred_fuels if f not in user_fuel_list]))

        # --- Scoring ---
        scored_vehicles = []
        for v in vehicles:
            # Skip if essential fields missing
            if any(col not in v or v[col] is None for col in ['Seating Capacity', 'Fuel Type', 'Body Type']):
                continue

            # Filter by body type and seating (+/- 1)
            if user_body and user_body not in v['Body Type'].lower():
                continue
            if abs(v['Seating Capacity'] - user_seating) > 1:
                continue

            # Fuel priority
            fuel_priority = final_preferred_fuels.index(v['Fuel Type'].lower()) if v['Fuel Type'].lower() in final_preferred_fuels else len(final_preferred_fuels)

            # Road preference: simple distance metric (1 if matches, 0 otherwise)
            road_score = 1 if v.get('Road Type', '').lower() == user_road_mapped.lower() else 0

            # Efficiency normalization
            eff = v.get('EFF (km/l)/(km/kwh)', 0) or 0

            # Ground clearance normalization
            gc = v.get('Ground Clearance (range)', 0) or 0

            if user_road in ["off-road", "hilly", "mid off-road"]:
                gc_weight = 0.3  # emphasize clearance
            else:
                gc_weight = 0.05  # deemphasize clearance for city driving

            # Simple weighted score: lower is better
            score = fuel_priority*10 + (abs(user_seating - v['Seating Capacity']))*5 - eff*2 - gc*gc_weight - road_score*5

            v['_score'] = score
            scored_vehicles.append(v)

        # Sort by score
        scored_vehicles.sort(key=lambda x: x['_score'])

        # Return top N
        output_cols = ['Manufacturer','Model','Body Type','Seating Capacity','Fuel Type','EFF (km/l)/(km/kwh)','Ground Clearance (range)']
        results = [{k: v.get(k, None) for k in output_cols} for v in scored_vehicles[:top_n]]

        return results

    except Exception as e:
        return {"error": str(e)}

# --- Main Execution Block ---
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No user preference JSON provided."}))
        sys.exit(1)

    try:
        user_prefs_json = sys.argv[1]
        user_prefs = json.loads(user_prefs_json)
        recommendations = generate_recommendations(user_prefs)
        print(json.dumps({"recommendations": recommendations}))
    except Exception as e:
        print(json.dumps({"error": f"Recommendation generation failed: {str(e)}"}))
        sys.exit(1)
