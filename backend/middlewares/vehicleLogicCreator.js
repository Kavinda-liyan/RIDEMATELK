const vehicleLogicCreator = (req, res, next) => {
  try {
    const data = { ...req.body }; // clone the incoming data

    // Ground Clearance Logic
    if ("Ground Clearance (range)" in data) {
      const gc = Number(data["Ground Clearance (range)"]);
      const roads = [
        "City/Urban",
        "Suburban/Normal",
        "Mid Off-Road",
        "Off-Road/Hilly Terrain",
      ];
      let roadValues;

      if (gc > 200) roadValues = [1, 1, 1, 1];
      else if (gc > 170) roadValues = [1, 1, 1, 0];
      else if (gc > 130) roadValues = [1, 1, 0, 0];
      else roadValues = [1, 0, 0, 0];

      roads.forEach((road, i) => (data[road] = roadValues[i]));
    }

    // Body Type Logic
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

    bodyTypes.forEach((type, index) => {
      const fieldName = `Body Type ${index + 1} (${type})`;
      data[fieldName] = data["Body Type"] === type ? 1 : 0;
    });

    // Calculate average fuel efficiency if needed
    if (!data["EFF (km/l)/(km/kwh)"] && data["Fuel Efficiency"]) {
      if (data["Fuel Efficiency"].includes("-")) {
        const [minEff, maxEff] = data["Fuel Efficiency"].split("-").map(Number);
        data["EFF (km/l)/(km/kwh)"] =
          minEff && maxEff ? (minEff + maxEff) / 2 : 0;
      } else {
        data["EFF (km/l)/(km/kwh)"] = Number(data["Fuel Efficiency"]) || 0;
      }
    }

    // Ensure numeric fields are numbers
    data["EFF (km/l)/(km/kwh)"] = Number(data["EFF (km/l)/(km/kwh)"]) || 0;
    data["Seating Capacity"] = Number(data["Seating Capacity"]) || 0;
    data["Ground Clearance (range)"] =
      Number(data["Ground Clearance (range)"]) || 0;

    req.body = data;

    next();
  } catch (error) {
    next(error);
  }
};
export default vehicleLogicCreator;
