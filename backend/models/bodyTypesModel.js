import mongoose from "mongoose";

const bodyTypesSchema = new mongoose.Schema(
  {
    bodytype: {
      type: mongoose.Schema.Types.String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    Description: { type: String, trim: true, default: "" },
    Purpose: { type: [String], trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
    collection: "bodytypes",
  }
);

export const bodyType = mongoose.model("bodyType", bodyTypesSchema);
