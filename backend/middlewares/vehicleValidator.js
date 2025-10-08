// middleware/vehicleValidator.js
const validateVehicleInput = (req, res, next) => {
    const body = req.body || {};

    const Manufacturer = body.Manufacturer;
    const Model = body.Model;
    const BodyType = body['Body Type'];
    const SeatingCapacity = body['Seating Capacity'];
    const FuelType = body['Fuel Type'];

    // For updates, we only check if a field exists before validating
    if ('Seating Capacity' in body && isNaN(parseInt(SeatingCapacity))) {
        return res.status(400).json({ message: "Seating Capacity must be a valid number." });
    }

    // Optionally, check for required fields on creation
    if (req.method === 'POST') {
        if (!Manufacturer || !Model || !BodyType || !SeatingCapacity || !FuelType) {
            return res.status(400).json({ message: "Missing required fields." });
        }
    }

    next();
};

export default validateVehicleInput;
