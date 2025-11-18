import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    trim: true,
    default: "",
    maxlength: 500,
  },
});

ratingSchema.index({ userId: 1, vehicleId: 1 }, { unique: true });

export const UserRating = mongoose.model("UserRating", ratingSchema);
