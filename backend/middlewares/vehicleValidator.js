// middleware/vehicleValidator.js
const validateVehicleInput = (req, res, next) => {
    const { 
        Manufacturer, Model, 'Body Type': BodyType, 
        'Seating Capacity': SeatingCapacity, 'Fuel Type': FuelType 
    } = req.body;

    // Check for required fields
    if (!Manufacturer || !Model || !BodyType || !SeatingCapacity || !FuelType) {
        return res.status(400).json({ 
            message: "Missing required fields." 
        });
    }

    // Check for basic numeric validation
    if (isNaN(parseInt(SeatingCapacity))) {
        return res.status(400).json({ 
            message: "Seating Capacity must be a valid number." 
        });
    }
    
    // Add more detailed validation for EFF and Ground Clearance if they are in the body

    next();
};

export default validateVehicleInput;