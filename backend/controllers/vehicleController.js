import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Vehicle } from "../models/vehicleModel.js";
import triggerRetraining from "../middlewares/automationService.js";
import vehicleLogicCreator from "../middlewares/vehicleLogicCreator.js";
import { bodyType } from "../models/bodyTypesModel.js";
import { Manufacturer } from "../models/manufactureModel.js";
import s3 from "../config/S3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
const { BUCKET_NAME, BUCKET_REGION } = process.env;

const upload = multer();
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
    res.status(200).json({ message: "Body type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//#------------------Manufacturer--------------#

//@route POST/api/vehicles/manufacturer
//@access Private/Admin

const createManufacturer = asyncHandler(async (req, res) => {
  const { manufacturer, country } = req.body;

  if (!manufacturer || !country) {
    res.status(400).json({ message: "Manufacturer and Country required" });
  }

  try {
    const newManufacturer = new Manufacturer(req.body);
    const createManufacturer = await newManufacturer.save();
    res.status(201).json(createManufacturer);
  } catch {
    return res.status(400).json({ message: error.message });
  }
});

//@route GET/api/vehicles/manufacturer

const getManufacturer = asyncHandler(async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteManufacturer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `No manufacturer found with id ${id}` });
  }

  try {
    await Manufacturer.findByIdAndDelete(id);
    res.status(200).json({ message: "Manufacturer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

const getVehiclesByFilter = asyncHandler(async (req, res) => {
  try {
    const {
      Manufacturer,
      "Fuel Type": fuelType,
      "Body Type": bodyType,
    } = req.query || {};

    const filter = {};
    if (Manufacturer)
      filter.Manufacturer = { $regex: Manufacturer, $options: "i" };
    if (fuelType) filter["Fuel Type"] = { $regex: fuelType, $options: "i" };
    if (bodyType) filter["Body Type"] = { $regex: bodyType, $options: "i" };

    const vehicles = await Vehicle.find(filter);
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
    const { tag, year, info_links, years, transmission, ...vehicleData } =
      req.body;

    // Parse JSON strings into arrays
    if (info_links && typeof info_links === "string") {
      vehicleData.info_links = JSON.parse(info_links);
    }

    if (years && typeof years === "string") {
      vehicleData.years = JSON.parse(years);
    }

    if (transmission && typeof transmission === "string") {
      vehicleData.transmission = JSON.parse(transmission);
    }

    // Handle multiple gallery files
    let galleryImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileName = `vehicles/${uuidv4()}=${file.originalname}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
          })
        );

        galleryImages.push({
          url: `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${fileName}`,
          tag: tag || "default",
          year: year || new Date().getFullYear(),
        });
      }
    }

    vehicleData.gallery_img = galleryImages;

    const vehicle = new Vehicle(vehicleData);
    const createdVehicle = await vehicle.save();

    triggerRetraining();

    res.status(201).json(createdVehicle);
  } catch (error) {
    console.error(error);
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
const deleteVehicle = async (req, res) => {
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

export { getBodyTypes, createBodyType, deleteBodyType };
export { createManufacturer, getManufacturer, deleteManufacturer };

export {
  getAllVehicles,
  getVehicle,
  getVehiclesByFilter,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
