import json
import sys
import numpy as np
from pymongo import MongoClient
import math

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
NUMERIC_COLS = ["Seating Capacity", "EFF (km/l)/(km/kwh)", "Ground Clearance (range)"]
BODY_TYPES = [
    "sedan",
    "hatchback",
    "suv",
    "mpv",
    "pickup",
    "coupe",
    "convertible",
    "wagon",
    "van",
    "crossover",
    "kei / microvan",
    "roadster",
    "other",
    "liftback",
    "mpv / minivan",
    "microvan",
    "minivan",
    "kei",
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
    """Convert NaN or None to 0 for safe JSON output."""
    if val is None or (isinstance(val, float) and math.isnan(val)):
        return 0
    return val


# --- Recommendation Logic ---
def generate_recommendations(user_prefs, top_n=1000):
    try:
        vehicles = list(vehicle_col.find())
        if not vehicles:
            return []

        user_body = user_prefs.get("body", "").lower().strip()
        user_seating = int(user_prefs.get("seating", 5))
        user_road = user_prefs.get("road", "city").lower().strip()
        user_traffic = user_prefs.get("traffic", "mixed").lower().strip()
        user_fuel = user_prefs.get("fuel", "petrol").lower().strip()
        user_road_mapped = ROAD_MAPPING.get(user_road, "City/Urban")

        if user_traffic == "high":
            preferred_fuels = ["electric", "hybrid", "petrol", "diesel"]
        elif user_traffic == "low":
            preferred_fuels = ["petrol", "diesel", "hybrid", "electric"]
        else:
            preferred_fuels = ["hybrid", "petrol", "electric", "diesel"]

        user_fuel_list = [user_fuel]
        final_preferred_fuels = list(
            dict.fromkeys(
                user_fuel_list + [f for f in preferred_fuels if f not in user_fuel_list]
            )
        )

        scored_vehicles = []
        for v in vehicles:
            if any(
                col not in v or v[col] is None
                for col in ["Seating Capacity", "Fuel Type", "Body Type"]
            ):
                continue

            if user_body and user_body not in v["Body Type"].lower():
                continue
            if abs(v["Seating Capacity"] - user_seating) > 1:
                continue

            fuel_priority = (
                final_preferred_fuels.index(v["Fuel Type"].lower())
                if v["Fuel Type"].lower() in final_preferred_fuels
                else len(final_preferred_fuels)
            )
            road_score = (
                1 if v.get("Road Type", "").lower() == user_road_mapped.lower() else 0
            )
            eff = v.get("EFF (km/l)/(km/kwh)", 0) or 0
            gc = v.get("Ground Clearance (range)", 0) or 0
            gc_weight = (
                0.3 if user_road in ["off-road", "hilly", "mid off-road"] else 0.05
            )
            score = (
                fuel_priority * 30
                + abs(user_seating - v["Seating Capacity"]) * 15
                - eff * 2
                - gc * gc_weight
                - road_score * 5
            )
            v["_score"] = score
            scored_vehicles.append(v)

        scored_vehicles.sort(key=lambda x: x["_score"])
        output_cols = [
            "Manufacturer",
            "Model",
            "Body Type",
            "Seating Capacity",
            "Fuel Type",
            "EFF (km/l)/(km/kwh)",
            "Ground Clearance (range)",
        ]
        results = [
            {
                k: (
                    None
                    if v.get(k) is None
                    or (isinstance(v.get(k), float) and math.isnan(v.get(k)))
                    else v.get(k)
                )
                for k in output_cols
            }
            for v in scored_vehicles
        ]
        return results

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
        recommendations = generate_recommendations(user_prefs)
        print(json.dumps({"recommendations": recommendations}))

    except Exception as e:
        print(json.dumps({"error": f"Recommendation generation failed: {str(e)}"}))
        sys.exit(1)
