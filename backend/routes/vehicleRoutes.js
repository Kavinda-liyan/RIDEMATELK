import express from 'express';
const router=express.Router();
import { Vehicle } from '../models/vehicleModel.js';

import validateVehicleInput from '../middlewares/vehicleValidator.js';
import transformVehicleData from '../middlewares/vehicleTransformer.js';
import triggerRetraining from '../middlewares/automationService.js';

//---------------View Vehicles---------------

//GET /api/vehicles
router.get('/',async(req,res)=>{
    try {
        const vehicles=await Vehicle.find({});
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

//GET /api/vehicles/:id
router.get('/:id',async(req,res)=>{
    try {
        const vehicle=await Vehicle.findById(req.params.id);
        if(!vehicle){
            return res.status(404).json({message:'Vehicle not found'});
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({message:error.message});
    }   
})

//POST /api/vehicles
router.post('/',validateVehicleInput,transformVehicleData,async(req,res)=>{
    try {
        const newVehicle=new Vehicle(req.body);
        await newVehicle.save();
        triggerRetraining();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

//PUT /api/vehicles/:id
router.put('/:id',validateVehicleInput,transformVehicleData,async(req,res)=>{
    try {
        const updatedVehicle=await Vehicle.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedVehicle){
            return res.status(404).json({message:'Vehicle not found'});
        }
        triggerRetraining();
        res.json(updatedVehicle);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

//DELETE /api/vehicles/:id
router.delete('/:id',async(req,res)=>{
    try {
        const deletedVehicle=await Vehicle.findByIdAndDelete(req.params.id);
        if(!deletedVehicle){
            return res.status(404).json({message:'Vehicle not found'});
        }
        triggerRetraining();
        res.json({message:'Vehicle deleted successfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

export default router;
