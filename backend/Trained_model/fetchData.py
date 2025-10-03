import pandas as pd
from pymongo import MongoClient

# 1️⃣ Load CSV
csv_file = r"D:\IT\Final Year Project\RideMateLK\backend\Trained_model\vehicles_merged.csv"
df = pd.read_csv(r"D:\IT\Final Year Project\RideMateLK\backend\Trained_model\vehicles_merged.csv")

df.drop(columns=['Unnamed: 0'], inplace=True, errors='ignore')

# 2️⃣ Connect to MongoDB
MONGO_URI = "mongodb://localhost:27017/"   # change if needed
DB_NAME = "ridematelk"
COLLECTION_NAME = "vehicledata"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# 3️⃣ Convert DataFrame to dictionary and insert into MongoDB
data_dict = df.to_dict(orient="records")
collection.insert_many(data_dict)

print(f"✅ Inserted {len(data_dict)} records into MongoDB.")
