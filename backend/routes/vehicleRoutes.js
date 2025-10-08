import express from "express";
const router = express.Router();

import validateVehicleInput from "../middlewares/vehicleValidator.js";
import transformVehicleData from "../middlewares/vehicleTransformer.js";
import {
  getAllVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";
import vehicleLogicCreator from "../middlewares/vehicleLogicCreator.js";
import { authAdmin, authenticate } from "../middlewares/authMiddleware.js";

//---------------View Vehicles---------------

//GET /api/vehicles
router.get("/",authenticate,authAdmin, getAllVehicles);
//GET /api/vehicles/:id
router.get("/:id", getVehicle);
//POST /api/vehicles
router.post(
  "/",
  authenticate,
  authAdmin,
  validateVehicleInput,
  transformVehicleData,
  vehicleLogicCreator,
  createVehicle
);
//PUT /api/vehicles/:id
router.patch(
  "/:id",
  authenticate,
  authAdmin,
  validateVehicleInput,
  transformVehicleData,
  vehicleLogicCreator,
  updateVehicle
);
//DELETE /api/vehicles/:id
router.delete("/:id", authenticate, authAdmin, deleteVehicle);

export default router;
