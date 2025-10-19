import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Vehicle } from "../models/vehicleModel.js";
import triggerRetraining from "../middlewares/automationService.js";
import vehicleLogicCreator from "../middlewares/vehicleLogicCreator.js";
import { bodyType } from "../models/bodyTypesModel.js";

//#------------------BodyTypes------------------#//
//@route GET/api/vehicles/bodytypes
//@access Public
const getBodyTypes = asyncHandler(async (req, res) => {
  try {
    const bodyTypes = await bodyType.find({});
    res.status(200).json(bodyTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//@route POST/api/vehicles/bodytypes
const createBodyType = asyncHandler(async (req, res) => {
  const { bodytype } = req.body;
  if (!req.body.bodytype || !req.body.Description) {
    return res
      .status(400)
      .json({ message: "Body Type and Description are required" });
  }

  const bodyTypeExists = await bodyType.findOne({
    bodytype,
  });

  if (bodyTypeExists) {
    return res.status(400).json({ message: "Body Type already exists" });
  }

  try {
    const newBodyType = new bodyType(req.body);
    const createdBodyType = await newBodyType.save();
    res.status(201).json(createdBodyType);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//@route DELETE/api/vehicles/bodytypes/:id
const deleteBodyType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `No body type found with id: ${id}` });
  }
  try {
    await bodyType.findByIdAndDelete(id);
    res.json({ message: "Body type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export { getBodyTypes, createBodyType, deleteBodyType };

//#------------------Vehicles------------------#//
// @route   GET /api/vehicles
// @access  Private/Admin
const getAllVehicles = asyncHandler(async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      Manufacturer,
      Model,
      "Body Type": bodyTypeFilter,
      "Fuel Type": fuelTypeFilter,
      search,
    } = req.query;

    const filter = {};

    if (Manufacturer) {
      filter.Manufacturer = { $regex: Manufacturer, $options: "i" };
    }
    if (Model) {
      filter.Model = { $regex: Model, $options: "i" };
    }
    if (bodyTypeFilter) {
      filter["Body Type"] = { $regex: bodyTypeFilter, $options: "i" };
    }
    if (fuelTypeFilter) {
      filter["Fuel Type"] = { $regex: fuelTypeFilter, $options: "i" };
    }

    if (search) {
      filter.$or = [
        { manufacturer: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
        { "Body Type": { $regex: search, $options: "i" } },
        { "Fuel Type": { $regex: search, $options: "i" } },
      ];
    }

    const total = await Vehicle.countDocuments(filter);
    const vehicles = await Vehicle.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      vehicles,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
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
      { $set: req.body },
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
