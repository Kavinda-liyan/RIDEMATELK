import { data } from "react-router-dom";
import { useEditVehicle } from "../../../../hooks/useEditVehicle";
const ViewVehicle = () => {
  const viewEditedVehicleHook = useEditVehicle();

  const tableDetails = [
    {
      field: "Year(s)",
      data: viewEditedVehicleHook.yearsArr.join(" , ") || "N/A",
    },
    { field: "Fuel Type", data: viewEditedVehicleHook.fuelType || "N/A" },
    {
      field: "Fuel Efficiency",
      data: viewEditedVehicleHook.fuelEfficiency || "N/A",
    },
    { field: "Body Type", data: viewEditedVehicleHook.bodyType || "N/A" },
    {
      field: "Seating Capacity",
      data: viewEditedVehicleHook.seatingCapacity || "N/A",
    },
    {
      field: "Ground Clearance (range)",
      data: viewEditedVehicleHook.groundClearance + " mm" || "N/A",
    },
    {
      field: "Transmission",
      data: viewEditedVehicleHook.transmissionArr.join(" , ") || "N/A",
    },
  ];

  return (
    <div className="col-span-5 bg-rmlk-dark-light rounded-md shadow-md max-h-[420px] overflow-y-scroll my-[16px] p-[16px] text-white font-rmlk-secondary">
      <div className="flex flex-col gap-[16px]">
        <div className="rounded-md bg-rmlk-dark-lighter shadow-md">
          <h3 className={"text-[16px] p-[4px] font-semibold text-center"}>
            {viewEditedVehicleHook.manufacturer.charAt(0).toUpperCase() +
              viewEditedVehicleHook.manufacturer.slice(1)}{" "}
            : {viewEditedVehicleHook.model.toUpperCase()}
          </h3>
        </div>
        <div>
          <table className="table-auto w-full text-[12px]">
            <tbody>
              {tableDetails.map((item, index) => (
                <tr key={index} className="border-b border-rmlk-dark-lighter">
                  <th className=" px-4 py-2 text-left">
                    <div className="max-w-[120px]">{item.field}</div>
                  </th>
                  <td className=" px-4 py-2 text-left">: {item.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicle;
