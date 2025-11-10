import InputWrapper from "../../../../components/Assets/InputWrapper";
import PageWrapper from "../../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../../components/BreadCrumb";
import { useEditVehicle } from "../../../../hooks/useEditVehicle";

const EditVehicle = () => {
  const editVehicleHook = useEditVehicle();

  if (editVehicleHook.loadVehicle) {
    return <div>Loading...</div>;
  }

  if (editVehicleHook.errorVehicle) {
    return <div>Error loading vehicle data.</div>;
  }

  return (
    <PageWrapper>
      <BreadCrumb
        links={[
          { label: "Vehicles", to: "/admin/allvehicles" },
          {
            label: "Edit vehicle",
            to: "admin/editvehicle/" + editVehicleHook.vehicle._id,
          },
        ]}
      />

      <div className="bg-rmlk-dark-light text-white font-rmlk-secondary p-[16px] rounded-md shadow-md">
        <h3 className="text-[24px] text-center font-semibold mb-[4px]">
          Edit Vehicle
        </h3>
        <div className="flex items-center justify-center w-full">
          <form className="text-[12px] font-rmlk-secondary">
            <div className="w-[90%] flex flex-col items-center justify-between gap-[16px]">
              <div className="flex  items-center w-full">
                <label htmlFor="Manufacturer" className="px-[8px] min-w-[100px]">
                  Manufacturer
                </label>
                <input
                  id="Manufacturer"
                  name="Manufacturer"
                  placeholder={editVehicleHook.vehicle.Manufacturer}
                  type="text"
                  className="p-[4px] bg-rmlk-dark-lighter text-white rounded-md min-w-[250px]"
                />
              </div>
              <div className="flex items-center w-full">
                <label htmlFor="Model" className="px-[8px] min-w-[100px]">
                  Model
                </label>
                <input
                  id="Model"
                  name="Model"
                  placeholder={editVehicleHook.vehicle.Model}
                  type="text"
                  className="p-[4px] bg-rmlk-dark-lighter text-white rounded-md min-w-[250px]"
                />
              </div>
            </div>
           
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditVehicle;
