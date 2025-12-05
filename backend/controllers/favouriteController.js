import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import { AddFavourite } from "../models/addFavouriteModel.js";

// Add a vehicle to user's favorites
export const addFavorite = asyncHandler(async (req, res) => {
  const { vehicleId } = req.body;
  const userId = req.user._id;

  if (!vehicleId) {
    return res.status(400).json({ message: "Vehicle ID is required" });
  }

  const vehicleObjectId = new mongoose.Types.ObjectId(vehicleId);
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // Check if it already exists
  const existingFavorite = await AddFavourite.findOne({
    userId: userObjectId,
    vehicleId: vehicleObjectId,
  });

  if (existingFavorite) {
    return res.status(400).json({
      message: "Vehicle is already in favorites",
    });
  }

  const favorite = new AddFavourite({
    userId: userObjectId,
    vehicleId: vehicleObjectId,
  });

  await favorite.save();

  res.status(201).json({ message: "Vehicle added to favorites", favorite });
});

// Remove a vehicle from user's favorites
export const removeFavorite = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  const userId = req.user._id;

  const vehicleObjectId = new mongoose.Types.ObjectId(vehicleId);
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const favorite = await AddFavourite.findOneAndDelete({
    userId: userObjectId,
    vehicleId: vehicleObjectId,
  });

  if (!favorite) {
    return res.status(404).json({ message: "Favorite not found" });
  }

  res.status(200).json({ message: "Vehicle removed from favorites" });
});

// Get user's favorites
export const getFavorites = asyncHandler(async (req, res) => {
  const userObjectId = new mongoose.Types.ObjectId(req.user._id);

  const favorites = await AddFavourite.find({ userId: userObjectId }).populate(
    "vehicleId"
  );

  const validFavorites = favorites.filter((fav) => fav.vehicleId !== null);

  res.status(200).json(validFavorites);
});
