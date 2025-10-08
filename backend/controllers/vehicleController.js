import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Vehicle } from "../models/vehicleModel.js";
import triggerRetraining from "../middlewares/automationService.js";
import vehicleLogicCreator from "../middlewares/vehicleLogicCreator.js";

// @route   GET /api/vehicles
// @access  Private/Admin
const getAllVehicles = asyncHandler(async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@route  GET /api/vehicles/:id
// @access  Private/Admin , Public/User
const getVehicle = asyncHandler(async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/vehicles
// @access  Private/Admin
const createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    const createdVehicle = await vehicle.save();
    triggerRetraining();

    res.status(201).json(createdVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Public
const updateVehicle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `No vehicle found with id: ${id}` });

  try {

    // Use $set to update only provided fields
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { $set:req.body },
      { new: true, runValidators: true }
    );

    if (!updatedVehicle)
      return res.status(404).json({ message: "Vehicle not found" });

    res.status(200).json(updatedVehicle);

    // Trigger retraining asynchronously
    triggerRetraining().catch((err) => console.error(err));
  } catch (error) {
    console.error("Patch Vehicle Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/vehicles/:id
// @access  Private/Admin
const deleteVehicle = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No vehicle found with id: ${id}` });
  }

  try {
    await Vehicle.findByIdAndDelete(id);
    res.json({ message: "Vehicle deleted successfully" });

    //route middleware to trigger retraining
    triggerRetraining();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
