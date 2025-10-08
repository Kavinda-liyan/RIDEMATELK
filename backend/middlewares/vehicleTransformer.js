// middleware/vehicleTransformer.js
const transformVehicleData = (req, res, next) => {
    let data = req.body || {};

    // Standardization and Coercion
    if (data['Fuel Type']) {
        data['Fuel Type'] = String(data['Fuel Type']).toLowerCase().trim();
    }
    if (data['Body Type']) {
        data['Body Type'] = String(data['Body Type']).toLowerCase().trim();
    }
    if (data['Seating Capacity']) {
        data['Seating Capacity'] = parseInt(data['Seating Capacity']);
    }
    if (data['EFF (km/l)/(km/kwh)']) {
        data['EFF (km/l)/(km/kwh)'] = parseFloat(data['EFF (km/l)/(km/kwh)']);
    }
    if (data['Ground Clearance (range)']) {
        data['Ground Clearance (range)'] = parseFloat(data['Ground Clearance (range)']);
    }

    req.body = data; // Update the request body
    next();
};

export default transformVehicleData;