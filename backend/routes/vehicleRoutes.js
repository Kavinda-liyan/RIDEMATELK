import express from 'express';
const router=express.Router();

import validateVehicleInput from '../middlewares/vehicleValidator.js';
import transformVehicleData from '../middlewares/vehicleTransformer.js';
import {getAllVehicles, getVehicle,createVehicle,updateVehicle, deleteVehicle} from '../controllers/vehicleController.js'
import vehicleLogicCreator from '../middlewares/vehicleLogicCreator.js';

//---------------View Vehicles---------------

//GET /api/vehicles
router.get('/',getAllVehicles)
//GET /api/vehicles/:id
router.get('/:id',getVehicle)
//POST /api/vehicles
router.post('/',validateVehicleInput,transformVehicleData,vehicleLogicCreator,createVehicle);
//PUT /api/vehicles/:id
router.patch('/:id',validateVehicleInput,transformVehicleData,vehicleLogicCreator,updateVehicle);
//DELETE /api/vehicles/:id
router.delete('/:id',deleteVehicle);

export default router;
