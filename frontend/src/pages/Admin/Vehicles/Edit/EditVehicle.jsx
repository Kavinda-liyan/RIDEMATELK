import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputWrapper from "../../../../components/Assets/InputWrapper";
import PageWrapper from "../../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../../components/BreadCrumb";
import { useEditVehicle } from "../../../../hooks/useEditVehicle";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { yearsArr } from "../../../../utils/yearList";

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

      <div className="grid grid-cols-12 gap-[16px] ">
        <div className="col-span-6 bg-rmlk-dark-light rounded-md shadow-md h-[480px] overflow-y-scroll my-[16px] p-[16px] text-white font-rmlk-secondary">
          <div className="flex flex-col w-full">
            <h3 className="text-[18px]">Basic vehicle informations</h3>
            <div className="my-[4px] h-[2px] w-full bg-rmlk-dark-lighter rounded-full"></div>
            <div id="bFormInfo" className="w-full">
              <form>
                <InputWrapper title={"Manufacturer and Model"}>
                  <div className="p-[8px] w-full text-[12px] flex flex-col gap-[4px]">
                    <div className="flex flex-col w-full my-[4px]">
                      <label htmlFor="manufacturer" className="pr-[2px]">
                        Manufacturer
                      </label>
                      <input
                        id="manufacturer"
                        name="manufacturer"
                        type="text"
                        placeholder={editVehicleHook.vehicle.Manufacturer}
                        className="w-full h-30px bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                      />
                    </div>
                    <div className="flex flex-col w-full my-[4px]">
                      <label htmlFor="model" className="pr-[2px]">
                        Model
                      </label>
                      <input
                        id="model"
                        name="model"
                        type="text"
                        placeholder={editVehicleHook.vehicle.Model}
                        className="w-full h-30px bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                      />
                    </div>
                  </div>
                </InputWrapper>
                <InputWrapper title={"Year of manufacture"}>
                  <div className="p-[8px] w-full text-[12px] flex flex-col gap-[4px]">
                    <div className="flex flex-wrap gap-[2px] py-[4px]">
                      {editVehicleHook.yearsArr.length > 0 ? (
                        editVehicleHook.yearsArr.map((year) => (
                          <span
                            key={year}
                            className="flex items-center px-[4px] py-[2px] text-[10px] text-amber-400 font-semibold  hover:cursor-pointer hover:text-white duration-200 "
                            onClick={() => {
                              editVehicleHook.handleRemoveYear(year);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="pr-[2px]"
                            />
                            {year}
                          </span>
                        ))
                      ) : (
                        <span className="text-[12px] text-red-600 px-[4px] py-[2px]">
                          No years added
                        </span>
                      )}
                    </div>
                    <div className="flex">
                      <select
                        id="year"
                        name="year"
                        value={editVehicleHook.newYear}
                        onChange={(e) => {
                          editVehicleHook.setNewYear(e.target.value);
                        }}
                        className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                      >
                        <option disabled value={[]}>
                          -- Select --
                        </option>
                        {yearsArr?.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => editVehicleHook.handleAddYear()}
                        className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </InputWrapper>
                <InputWrapper title={"Fuel Type and Efficiency"}>
                  <div className="p-[8px] w-full text-[12px] flex flex-row gap-[16px]">
                    <div className="flex flex-col w-full my-[4px]">
                      <label htmlFor="fuelType" className="pr-[2px]">
                        Fuel Type
                      </label>
                      <input
                        id="fuelType"
                        name="fuelType"
                        type="text"
                        placeholder={editVehicleHook.vehicle["Fuel Type"]}
                        className="w-full h-30px bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                      />
                    </div>
                    <div className="flex flex-col w-full my-[4px]">
                      <label htmlFor="fuelEff" className="pr-[2px]">
                        Fuel Efficiency
                      </label>
                      <input
                        id="fuelEff"
                        name="fuelEff"
                        type="text"
                        placeholder={editVehicleHook.vehicle["Fuel Efficiency"]}
                        className="w-full h-30px bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                      />
                    </div>
                  </div>
                </InputWrapper>
                <InputWrapper
                  title={"Body Type, Ground Clearance and Seating Capacity"}
                >
                  <div className="p-[8px] w-full text-[12px] flex flex-row gap-[16px]">
                    <div className="flex flex-col w-full my-[4px]">
                      <label htmlFor="bodyType" className="pr-[2px]">
                        Body Type
                      </label>
                      <input
                        id="bodyType"
                        name="bodyType"
                        type="text"
                        placeholder={editVehicleHook.vehicle["Body Type"]}
                        className="w-full h-30px bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                      />
                    </div>
                    <div className="flex flex-col w-full my-[4px]">
                      <label htmlFor="seat" className="pr-[2px]">
                        Seating Capacity
                      </label>
                      <input
                        id="seat"
                        name="seat"
                        type="number"
                        placeholder={
                          editVehicleHook.vehicle["Seating Capacity"]
                        }
                        className="w-full h-30px bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                      />
                    </div>
                    <div className="flex flex-col w-full my-[4px]">
                      <label htmlFor="gc" className="pr-[2px]">
                        Ground Clearance
                      </label>
                      <input
                        id="gc"
                        name="gc"
                        type="number"
                        placeholder={
                          editVehicleHook.vehicle["Ground Clearance (range)"]
                        }
                        className="w-full h-30px bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                      />
                    </div>
                  </div>
                </InputWrapper>
                <InputWrapper title={"Transmission(s)"}>
                  <div className="p-[8px] w-full text-[12px] flex flex-col gap-[4px]">
                    <div className="flex flex-wrap gap-[2px] py-[4px]">
                      {editVehicleHook.transmissionArr.length > 0 ? (
                        editVehicleHook.transmissionArr.map((transmission) => (
                          <span
                            key={transmission}
                            className="flex items-center px-[4px] py-[2px] text-[10px] text-amber-400 font-semibold  hover:cursor-pointer hover:text-white duration-200 "
                            onClick={() => {
                              editVehicleHook.handleRemoveTransmission(
                                transmission
                              );
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="pr-[2px]"
                            />
                            {transmission}
                          </span>
                        ))
                      ) : (
                        <span className="text-[12px] text-red-600 px-[4px] py-[2px]">
                          No transmission(s) added
                        </span>
                      )}
                    </div>
                    <div className="flex">
                      <select
                        id="year"
                        name="year"
                        value={editVehicleHook.newTransmission}
                        onChange={(e) => {
                          editVehicleHook.setNewTransmission(e.target.value);
                        }}
                        className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                      >
                        <option disabled value={[]}>
                          -- Select --
                        </option>
                        {editVehicleHook.transmissionTypesArr?.map(
                          (transmission) => (
                            <option key={transmission} value={transmission}>
                              {transmission}
                            </option>
                          )
                        )}
                      </select>

                      <button
                        onClick={() => editVehicleHook.handleAddTransmission()}
                        className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </InputWrapper>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditVehicle;
