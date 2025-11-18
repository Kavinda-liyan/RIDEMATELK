import { UserRating } from "../models/userRating.js";
import asyncHandler from "../middlewares/asyncHandler.js";

//@desc Add or Update User Rating and Review for a Vehicle POST /api/ratings

const addOrUpdateRating = asyncHandler(async (req, res) => {
  const { vehicleId, rating, review } = req.body;
  const userId = req.user._id;

  if (!vehicleId || !rating) {
    return res
      .status(400)
      .json({ message: "Vehicle ID and rating are required" });
  }

  try {
    // Create or update rating
    const rated = await UserRating.findOneAndUpdate(
      { userId, vehicleId },
      { rating, review },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // Recalculate average rating
    const allRatings = await UserRating.find({ vehicleId });
    const averageRating =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    res.status(200).json({
      message: "Rating submitted successfully",
      rating: rated,
      averageRating: Number(averageRating.toFixed(1)),
      ratingCount: allRatings.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//@desc Get User Rating for a Vehicle GET /api/ratings/:vehicleId
const getVehicleRatings = asyncHandler(async (req, res) => {
  try {
    const ratings = await UserRating.find({ vehicleId: req.params.vehicleId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//@desc Get Average Rating for a Vehicle GET /api/ratings/average/:vehicleId
const getAvarageRating = asyncHandler(async (req, res) => {
  try {
    const ratings = await UserRating.find({ vehicleId: req.params.vehicleId });

    if (!ratings.length) {
      return res.status(200).json({ averageRating: 0, ratingCount: 0 });
    }

    const avgRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    res.status(200).json({
      averageRating: Number(avgRating.toFixed(1)),
      ratingCount: ratings.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export { addOrUpdateRating, getVehicleRatings, getAvarageRating };
