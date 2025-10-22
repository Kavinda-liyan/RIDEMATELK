import mongoose from "mongoose";

const bodyTypes = [
  "sedan",
  "hatchback",
  "suv",
  "mpv",
  "pickup",
  "coupe",
  "convertible",
  "wagon",
  "van",
  "crossover",
  "kei / microvan",
  "roadster",
  "other",
  "liftback",
  "mpv / minivan",
];

const roads = [
  "City/Urban",
  "Suburban/Normal",
  "Mid Off-Road",
  "Off-Road/Hilly Terrain",
];

const roadFields = {};
roads.forEach((type) => {
  roadFields[type] = { type: Number, required: true, default: 0 };
});

const bodyTypeFields = {};
bodyTypes.forEach((type, index) => {
  const fieldName = `Body Type ${index + 1} (${type})`;
  bodyTypeFields[fieldName] = { type: Number, default: 0 };
});

const vehicleSchema = new mongoose.Schema(
  {
    Manufacturer: { type: String, required: true, trim: true },
    Model: { type: String, trim: true, lowercase: true, required: true },
    "Body Type": { type: String, trim: true, lowercase: true, required: true },
    "Fuel Type": { type: String, trim: true, required: true },
    "Fuel Efficiency": { type: String, trim: true, default: "" },
    "EFF (km/l)/(km/kwh)": { type: Number, default: 0 },
    "Seating Capacity": { type: Number, required: true, default: 0 },
    "Ground Clearance (range)": { type: Number, required: true, default: 0 },
    ...bodyTypeFields,
    ...roadFields,
    transmission: [{ type: String, required: true }],
    years: [{ type: Number, required: true }],
    info_links: [
      { link: { type: String, trim: true }, tag: { type: String, trim: true } },
    ],
    gallery_img: [
      {
        url: { type: String, required: true, trim: true },
        tag: { type: String, required: true, trim: true },
        year: { type: Number, required: true, trim: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: "vehicledata",
  }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
