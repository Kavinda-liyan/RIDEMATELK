import Vehicle from '../models/vehicleModel.js';
import mongoose from 'mongoose';

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new vehicle
// @route   POST /api/vehicles
// @access  Public
const createVehicle = async (req, res, next) => {
    try {
        const vehicle = new Vehicle(req.body);
        const createdVehicle = await vehicle.save();
        res.status(201).json(createdVehicle);
        
        // IMPORTANT: Call next() to allow the route middleware to trigger retraining
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Public
const updateVehicle = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No vehicle found with id: ${id}` });
    }

    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedVehicle) {
            return res.status(404).json({ message: `Vehicle not found` });
        }
        
        res.json(updatedVehicle);
        
        // IMPORTANT: Call next() to allow the route middleware to trigger retraining
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Public
const deleteVehicle = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No vehicle found with id: ${id}` });
    }

    try {
        await Vehicle.findByIdAndDelete(id);
        res.json({ message: 'Vehicle deleted successfully' });
        
        // IMPORTANT: Call next() to allow the route middleware to trigger retraining
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
