import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  Manufacturer:{type:String,required:true,trim:true},
  Model:{type:String,trim:true,lowercase:true,required:true},
  'Body Type':{type:String,trim:true,lowercase:true,required:true},
  'Fuel Type':{type:String,trim:true,required:true},
  'EFF (km/l)/(km/kwh)':{type:Number,required:true,default:0},
  'Seating Capacity':{type:Number,required:true,default:0},
  'Ground Clearance (range)':{type:Number,required:true,default:0},
  'info link (default_1)':{type:String,trim:true,},
  'info link (default_2)':{type:String,trim:true,},
}, {
  timestamps:true,
  collection: 'vehicledata' // <-- match your actual MongoDB collection name
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);