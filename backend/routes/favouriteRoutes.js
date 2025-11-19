import express from "express";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favouriteController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Add to favorites
router.post("/", authenticate, addFavorite);

//Remove from favorites
router.delete("/:vehicleId", authenticate, removeFavorite);

//Get user's favorites
router.get("/", authenticate, getFavorites);

export default router;
