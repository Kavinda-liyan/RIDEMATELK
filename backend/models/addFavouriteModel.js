import mongoose from "mongoose";

const addFavouriteSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true, collection: "addfavourites" }
);

addFavouriteSchema.index({ userId: 1, vehicleId: 1 }, { unique: true });
export const AddFavourite = mongoose.model("AddFavourite", addFavouriteSchema);
