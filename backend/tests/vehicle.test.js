import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Vehicle } from "../models/vehicleModel.js"; // adjust path

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up data after each test
  await Vehicle.deleteMany({});
});

describe("Vehicle Model Integration Tests", () => {
  it("should create and save a vehicle successfully", async () => {
    const vehicleData = {
      Manufacturer: "Toyota",
      Model: "corolla",
      "Body Type": "sedan",
      "Fuel Type": "petrol",
      "Seating Capacity": 5,
      "Ground Clearance (range)": 160,
      transmission: ["automatic"],
      years: [2020, 2021],
    };

    const vehicle = new Vehicle(vehicleData);
    const savedVehicle = await vehicle.save();

    // Assertions
    expect(savedVehicle._id).toBeDefined();
    expect(savedVehicle.Manufacturer).toBe(vehicleData.Manufacturer);
    expect(savedVehicle.Model).toBe(vehicleData.Model);
    expect(savedVehicle["Body Type"]).toBe(vehicleData["Body Type"]);
  });

  it("should fail to create a vehicle without required fields", async () => {
    const vehicleData = { Manufacturer: "Honda" };
    let err;
    try {
      const vehicle = new Vehicle(vehicleData);
      await vehicle.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.name).toBe("ValidationError");
  });
});
