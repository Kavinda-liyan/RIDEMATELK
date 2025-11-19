import { useViewRecommendedVehicle } from "../../hooks/useViewRecommendedVehicle";
import imgPlaceholder from "../../assets/placeholderimg.svg";
import Description from "./Description";
import { recommendationUtils } from "../../utils/recommendationUtils";
import { useSelector } from "react-redux";
import VehicleCard from "../../components/VehicleCard";
import Rating from "./Rating";
import AverageRatingField from "./AverageRatingField";
import { useAllRecommendations } from "../../hooks/useAllRecommendations";
import { useLocation } from "react-router-dom";

const VehicleDetails = () => {
  const {
    loadingVehicle,
    errorVehicle,
    displayedVehicle,
    navigate,
    recommendations,
  } = useAllRecommendations();

  const { userInfo } = useSelector((state) => state.auth);
  const { vehicleData, vehicleError, vehicleLoading } =
    useViewRecommendedVehicle();

  const { bodyTypeRecommendation, errorBt, loadingBt, GcRecommendation } =
    recommendationUtils();

  const { state } = useLocation();
  const restRecommendations = state?.recommendations || [];
  const sidebarVehicles = restRecommendations.filter(
    (v) => v.id !== vehicleData?._id
  );

  const flatBodyTypes = bodyTypeRecommendation?.flat() || [];

  const vehicleBodyType = vehicleData?.["Body Type"] || "";
  const bodyParts = vehicleBodyType.toLowerCase().split(/[\/-]/);
  const matchedBodyType = flatBodyTypes.find((bt) =>
    bodyParts.some((part) => part.trim() === bt.body_Type.toLowerCase())
  );

  const bodyTypeDescription =
    matchedBodyType?.description || "No description available.";

  const vehicleGroundClearance =
    vehicleData?.["Ground Clearance (range)"] || "";
  // Determine ground clearance category
  let matchedGC = null;
  if (vehicleGroundClearance) {
    if (vehicleGroundClearance < 140) {
      matchedGC = GcRecommendation.find((gc) => gc.ground_clearance === "low");
    } else if (vehicleGroundClearance < 180) {
      matchedGC = GcRecommendation.find(
        (gc) => gc.ground_clearance === "medium"
      );
    } else if (vehicleGroundClearance < 210) {
      matchedGC = GcRecommendation.find((gc) => gc.ground_clearance === "high");
    } else {
      matchedGC = GcRecommendation.find(
        (gc) => gc.ground_clearance === "very high"
      );
    }
  }

  const GCDescription =
    matchedGC?.description || "No ground clearance info available.";

  return (
    <div className="min-h-[100dvh] bg-rmlk-dark pt-[50px] px-[60px] pb-[16px] font-rmlk-secondary text-white">
      <div
        className={`grid grid-cols-12 gap-[16px] h-full  ${
          userInfo && userInfo.isAdmin ? "" : "px-[60px]"
        }`}
      >
        {/* LEFT SIDE */}
        <div className="col-span-12 bg-rmlk-dark-light  flex rounded-md shadow-md ">
          {vehicleLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-white text-[16px]">
                Loading vehicle details...
              </p>
            </div>
          ) : vehicleError ? (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-white text-[16px]">
                Error loading vehicle details!
              </p>
            </div>
          ) : vehicleData ? (
            <div
              className={`flex flex-col  ${
                userInfo && userInfo.isAdmin
                  ? "p-[16px] "
                  : "py-[16px] px-[32px]"
              }`}
            >
              {/* CAR DETAILS */}
              <div className="h-full w-full flex gap-[16px] items-center ">
                {/* Vehicle Image */}
                <div className="w-[60%] relative bg-rmlk-dark-lighter rounded-xs overflow-hidden shadow-md group">
                  <img
                    src={
                      vehicleData?.gallery_img?.length > 0
                        ? vehicleData.gallery_img[0].url
                        : imgPlaceholder
                    }
                    alt="Vehicle"
                    className="w-full object-cover aspect-video group-hover:scale-110 transition-all duration-300"
                  />
                  <div className="w-full text-center absolute z-[1] bottom-0 bg-black/50">
                    <h2 className="text-[18px] group-hover:text-[22px] transition-all duration-300 font-semibold">
                      {vehicleData.Manufacturer.toUpperCase()} :{" "}
                      {vehicleData.Model.toUpperCase()}
                    </h2>
                  </div>
                </div>

                {/* Vehicle Specs Table */}
                <div className="w-[40%] text-left  h-full">
                  <table className="w-full text-left text-[12px] border-separate border-spacing-y-[6px]">
                    <tbody>
                      <tr className="border-b border-white">
                        <td className="font-semibold w-[150px]">
                          Manufacturer
                        </td>
                        <td>{vehicleData.Manufacturer.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Model</td>
                        <td>{vehicleData.Model.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Ground Clearance</td>
                        <td>{vehicleData["Ground Clearance (range)"]} mm</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Seating Capacity</td>
                        <td>{vehicleData["Seating Capacity"]}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Body Type</td>
                        <td>
                          <div className="px-[4px] py-[1px] bg-green-600 text-center w-fit rounded-xs shadow-md text-[10px] font-semibold">
                            {vehicleData["Body Type"].charAt(0).toUpperCase() +
                              vehicleData["Body Type"].slice(1)}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Fuel Type</td>
                        <td>
                          <div
                            className={`px-[4px] py-[1px] text-center w-fit rounded-xs shadow-md text-[10px] font-semibold ${
                              vehicleData["Fuel Type"].toLowerCase() ===
                              "petrol"
                                ? "bg-amber-500"
                                : vehicleData["Fuel Type"].toLowerCase() ===
                                  "diesel"
                                ? "bg-red-600"
                                : vehicleData["Fuel Type"].toLowerCase() ===
                                  "electric"
                                ? "bg-blue-600"
                                : "bg-green-600"
                            }`}
                          >
                            {vehicleData["Fuel Type"].charAt(0).toUpperCase() +
                              vehicleData["Fuel Type"].slice(1)}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Fuel Efficiency</td>
                        <td>
                          {vehicleData["EFF (km/l)/(km/kwh)"]}{" "}
                          {vehicleData["Fuel Type"].toLowerCase() === "electric"
                            ? "km/kwh"
                            : "km/l"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold align-top">
                          Transmission
                        </td>
                        <td>
                          {Array.isArray(vehicleData?.transmission) &&
                          vehicleData.transmission.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {vehicleData.transmission.map((type, index) => (
                                <div
                                  key={index}
                                  className="px-[4px] py-[1px] text-center w-fit rounded-xs shadow-md text-[10px] font-semibold bg-blue-600"
                                >
                                  {type}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span>N/A</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="my-[4px]">
                    <AverageRatingField vehicleId={vehicleData._id} />
                  </div>
                </div>
              </div>

              {/* Vehicle Description */}
              <div className="mt-[16px]">
                {loadingBt ? (
                  <p className="text-white">Loading description...</p>
                ) : errorBt ? (
                  <p className="text-white">Error loading description!</p>
                ) : (
                  <Description
                    manufacturer={vehicleData["Manufacturer"]}
                    model={vehicleData["Model"]}
                    seats={vehicleData["Seating Capacity"]}
                    bodytype={vehicleData["Body Type"]}
                    descriptionbt={bodyTypeDescription}
                    groundclearance={vehicleData["Ground Clearance (range)"]}
                    descriptiongc={GCDescription}
                  />
                )}
              </div>
              <div className="my-[8px] h-[1px] w-full bg-rmlk-dark-lighter"></div>
              <div className="flex-grow">
                <h3 className="text-[14px] text-amber-500">
                  View this vehicle in online marketplaces for new or second
                  hand cars.
                </h3>
                <div className="my-[8px] flex  gap-[8px]">
                  {Array.isArray(vehicleData?.info_links) &&
                  vehicleData.info_links.length > 0 ? (
                    vehicleData.info_links.map(({ tag, link }, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block text-rmlk-primary decoration-none text-center py-[6px] w-fit px-[32px] rounded-xs shadow-md cursor-pointer ${
                          tag === "ikman"
                            ? "bg-[#149777]"
                            : tag === `riyasewana`
                            ? "bg-[#039be6]"
                            : tag === "other"
                            ? "bg-gray-900"
                            : "bg-blue-600"
                        }`}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </a>
                    ))
                  ) : (
                    <p className="text-white ">
                      No marketplace links available.
                    </p>
                  )}
                </div>
              </div>
              <div className="my-[8px] h-[1px] w-full bg-rmlk-dark-lighter"></div>
              <div className="flex-grow border-[1.5px] p-[16px] border-rmlk-dark-lighter rounded-md">
                <div className="mt-[8px] flex  gap-[8px]">
                  <h3 className="text-[18px]">Ratings</h3>
                </div>
                <Rating vehicleId={vehicleData._id} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
