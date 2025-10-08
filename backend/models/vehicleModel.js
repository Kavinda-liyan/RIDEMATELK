import mongoose from "mongoose";
import { type } from "os";


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
  "Off-Road/Hilly Terrain"
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


const vehicleSchema = new mongoose.Schema({
  Manufacturer:{type:String,required:true,trim:true},
  Model:{type:String,trim:true,lowercase:true,required:true},
  'Body Type':{type:String,trim:true,lowercase:true,required:true},
  'Fuel Type':{type:String,trim:true,required:true},
  'Fuel Efficiency':{type:String,trim:true,default:""},
  'EFF (km/l)/(km/kwh)':{type:Number,default:0},
  'Seating Capacity':{type:Number,required:true,default:0},
  'Ground Clearance (range)':{type:Number,required:true,default:0},
  ...bodyTypeFields,
  ...roadFields,
  'info link (default_1)':{type:String,trim:true,default:""},
  'info link (default_2)':{type:String,trim:true,default:""},
}, {
  timestamps:true,
  collection: 'vehicledata' 
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);