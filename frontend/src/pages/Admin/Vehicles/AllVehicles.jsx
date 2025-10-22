import { useDispatch, useSelector } from "react-redux";
import { useGetVehiclesQuery } from "../../../app/api/vehiclesApiSlice";
import { setPage } from "../../../app/slices/paginationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../components/BreadCrumb";

const AllVehicles = () => {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state) => state.pagination);
  const [filters, setFilters] = useState({
    Manufacturer: "",
    Model: "",
    fuelType: "",
    bodyType: "",
    seatingCapacity: "",
  });

  const { data, isLoading, isError } = useGetVehiclesQuery(
    { page, limit, ...filters },
    { refetchOnMountOrArgChange: true }
  );

  const visiblePages = 5;

  const totalPages = data?.pages || 1;

  const groupStart = Math.floor((page - 1) / visiblePages) * visiblePages + 1;
  const groupEnd = Math.min(groupStart + visiblePages - 1, totalPages);

  const vehicleTableHead = [
    "Manufacturer",
    "Model",
    "Fuel Type",
    "Fuel Efficiency",
    "Body Type",
    "Seating Capacity",
    "Ground Clearance",
    "Road Capability",
    "Year",
  ];

  console.log("Vehicles Data:", data);

  const roadCondition = [
    { type: "City/Urban", color: "bg-green-400" },
    { type: "Suburban/Normal", color: "bg-amber-400" },
    { type: "Mid Off-Road", color: "bg-orange-500" },
    { type: "Off-Road/Hilly Terrain", color: "bg-red-600" },
  ];
  const handleVehicleClick = () => {};

  useEffect(() => {
    dispatch(setPage(1));
  }, [filters, dispatch]);

  return (
    <PageWrapper>
      <BreadCrumb
        links={[{ label: "Vehicles", to: "/admin/allvehicles" }, ]}
      />
      <div className="bg-rmlk-dark-light p-[16px] rounded-md shadow-md flex flex-wrap gap-[20px] items-center font-rmlk-secondary text-[12px] text-white">
        <div className="flex items-center">
          <Link
            to="/admin/addvehicle"
            className="w-fit h-fit px-[8px] py-[4px] rounded-md bg-rmlk-red text-white font-semibold shadow-md hover:bg-rmlk-red-light duration-200"
          >
            <FontAwesomeIcon icon={faPlus} /> Add new vehicle
          </Link>
        </div>
        <input
          type="text"
          placeholder="manufacturer"
          value={filters.Manufacturer}
          onChange={(e) =>
            setFilters({ ...filters, Manufacturer: e.target.value })
          }
        />
      </div>
      <div className="mt-[20px] bg-rmlk-dark-light rounded-md text-white">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-rmlk-dark-lighter border-b border-gray-600 font-rmlk-secondary font-light text-[12px]">
              {vehicleTableHead.map((head) => (
                <th key={head} className="p-2 text-left">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-2">
                  Loading vehicles...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="text-center text-red-500 p-2">
                  Error loading vehicles!
                </td>
              </tr>
            ) : data?.vehicles?.length > 0 ? (
              data.vehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="text-[12px] font-rmlk-secondary transition-all duration-200 hover:cursor-pointer"
                  onClick={() => handleVehicleClick()}
                >
                  <td className="p-2">{vehicle["Manufacturer"]}</td>
                  <td className="p-2">{vehicle["Model"]}</td>
                  <td className={`p-2 `}>
                    <div className="flex items-center gap-2 justify-start">
                      <span
                        className={`w-[4px] h-[4px] rounded-full ${
                          vehicle["Fuel Type"]?.toLowerCase().trim() ===
                          "petrol"
                            ? "bg-orange-400"
                            : vehicle["Fuel Type"]?.toLowerCase().trim() ===
                              "diesel"
                            ? "bg-red-600"
                            : vehicle["Fuel Type"]?.toLowerCase().trim() ===
                              "electric"
                            ? "bg-sky-600"
                            : vehicle["Fuel Type"]?.toLowerCase().trim() ===
                              "hybrid"
                            ? "bg-green-400"
                            : ""
                        }`}
                      ></span>
                      <span>{vehicle["Fuel Type"]}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    {vehicle["EFF (km/l)/(km/kwh)"]}{" "}
                    {vehicle["Fuel Type"]?.toLowerCase().trim() === "petrol" ||
                    vehicle["Fuel Type"]?.toLowerCase().trim() === "diesel" ||
                    vehicle["Fuel Type"]?.toLowerCase().trim() === "hybrid"
                      ? " Km/h"
                      : " km/kwh"}
                  </td>
                  <td className="p-2">{vehicle["Body Type"]}</td>
                  <td className="p-2">{vehicle["Seating Capacity"]}</td>
                  <td className="p-2">{vehicle["Ground Clearance (range)"]}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2 justify-start">
                      {roadCondition.map((condition) => (
                        <div
                          key={condition.type}
                          className={`w-[8px] h-[8px] rounded-full ${
                            vehicle[condition.type] === 1
                              ? `${condition.color}`
                              : "bg-rmlk-dark-lighter"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </td>
                  <td className="p-2">{vehicle["Year"]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 p-2">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && totalPages > 1 && (
        <div className="flex justify-center py-4 gap-2 font-rmlk-secondary text-[12px] text-white">
          {/* Prev / Next controls */}
          <button
            className="px-3 py-1 bg-rmlk-dark-lighter rounded disabled:opacity-50 hover:cursor-pointer"
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            Prev
          </button>
          {/* Jump to previous group */}
          {groupStart > 1 && (
            <button
              className="px-3 py-1 bg-rmlk-dark-lighter rounded hover:cursor-pointer"
              onClick={() => dispatch(setPage(groupStart - 1))}
            >
              ...
            </button>
          )}

          {/* Page buttons */}
          {Array.from(
            { length: groupEnd - groupStart + 1 },
            (_, i) => groupStart + i
          ).map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${
                page === p
                  ? "border border-rmlk-red bg-rmlk-dark-lighter hover:cursor-pointer"
                  : "bg-rmlk-dark-lighter hover:cursor-pointer"
              }`}
              onClick={() => dispatch(setPage(p))}
            >
              {p}
            </button>
          ))}

          {/* Jump to next group */}
          {groupEnd < totalPages && (
            <button
              className="px-3 py-1 bg-rmlk-dark-lighter rounded hover:cursor-pointer"
              onClick={() => dispatch(setPage(groupEnd + 1))}
            >
              ...
            </button>
          )}

          <button
            className="px-2 py-1 bg-rmlk-dark-lighter rounded disabled:opacity-50 hover:cursor-pointer"
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </button>
        </div>
      )}
    </PageWrapper>
  );
};

export default AllVehicles;
