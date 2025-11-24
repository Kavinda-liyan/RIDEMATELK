import express from "express";
import {
  addOrUpdateRating,
  getVehicleRatings,
  getAvarageRating,
  getAllRatings,
} from "../controllers/userRatingController.js";
import { authAdmin, authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Add or Update
router.post("/", authenticate, addOrUpdateRating);
//Get Ratings for a Vehicle
router.get("/:vehicleId", getVehicleRatings);
//Get Average Rating for a Vehicle
router.get("/average/:vehicleId", getAvarageRating);
//Get All Ratings
router.get("/", authenticate, authAdmin, getAllRatings);

export default router;
