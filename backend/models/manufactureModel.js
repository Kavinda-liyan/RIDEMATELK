import mongoose from "mongoose";

const manufactureSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Manufacturer",
  }
);

export const Manufacturer = mongoose.model("Manufacturer", manufactureSchema);
