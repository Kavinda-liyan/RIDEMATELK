import express from "express";
import {
  addOrUpdateRating,
  getVehicleRatings,
  getAvarageRating,
} from "../controllers/userRatingController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Add or Update
router.post("/", authenticate, addOrUpdateRating);
//Get Ratings for a Vehicle
router.get("/:vehicleId", getVehicleRatings);
//Get Average Rating for a Vehicle
router.get("/average/:vehicleId", getAvarageRating);

export default router;
