import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputWrapper from "../../../../components/Assets/InputWrapper";
import { useEditVehicle } from "../../../../hooks/useEditVehicle";
import { vehicleUtils } from "../../../../utils/vehicleUtils";

const EditVehicleForm = () => {
  const editVehicleHook = useEditVehicle();
  const {
    yearsArr,
    fuelTypeArr,
    transmissionTypesArr,
    ManufacturerArr,
    ManufacturerError,
    ManufacturerLoading,
    infoTagsArr,
  } = vehicleUtils();

  if (editVehicleHook.loadVehicle) {
    return <div>Loading...</div>;
  }

  if (editVehicleHook.errorVehicle) {
    return <div>Error loading vehicle data.</div>;
  }

  return (
    <>
      <div className="col-span-7 bg-rmlk-dark-light rounded-md shadow-md max-h-[420px] overflow-y-scroll my-[16px] p-[16px] text-white font-rmlk-secondary">
        <div className="flex flex-col w-full">
          <h3 className="text-[18px]">Basic vehicle informations</h3>
          <div className="my-[4px] h-[2px] w-full bg-rmlk-dark-lighter rounded-full"></div>
          <div
            id="bFormInfo"
            className="w-full text-[12px] font-rmlk-secondary"
          >
            <form onSubmit={editVehicleHook.handleFormSubmit}>
              <InputWrapper title={"Manufacturer and Model"}>
                <div className="p-[8px] w-full text-[12px] flex  gap-[4px]">
                  <div className="flex flex-col  my-[4px] w-1/3">
                    <label htmlFor="manufacturer" className="pr-[2px]">
                      Manufacturer
                    </label>
                    <div className="flex">
                      {ManufacturerLoading ? (
                        <p>Loading</p>
                      ) : ManufacturerError ? (
                        <p>Error...</p>
                      ) : (
                        <select
                          id="manufacturer"
                          name="manufacturer"
                          value={editVehicleHook.manufacturer}
                          onChange={(e) => {
                            editVehicleHook.setManufacturer(e.target.value);
                          }}
                          className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                        >
                          <option disabled value={[]}>
                            -- Select --
                          </option>
                          {ManufacturerArr?.map((manufacturer) => (
                            <option key={manufacturer} value={manufacturer}>
                              {manufacturer}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-2/3 my-[4px]">
                    <label htmlFor="model" className="pr-[2px]">
                      Model
                    </label>
                    <input
                      id="model"
                      name="model"
                      type="text"
                      placeholder={editVehicleHook.model}
                      onChange={(e) => {
                        editVehicleHook.setModel(e.target.value);
                      }}
                      className="w-full h-[30px] bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                    />
                  </div>
                </div>
              </InputWrapper>
              <InputWrapper title={"Year of manufacture"}>
                <div className="p-[8px] w-full text-[12px] flex  gap-[4px]">
                  <div className="flex flex-wrap gap-[2px] py-[4px] w-1/3">
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
                  <div className="flex w-2/3">
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
                      type="button"
                      onClick={(e) => {
                        editVehicleHook.handleAddYear();
                        e.preventDefault();
                      }}
                      className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] h-[30px] duration-200 text-[16px]"
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
                    <div className="flex">
                      <select
                        id="fuelType"
                        name="fuelType"
                        value={editVehicleHook.fuelType}
                        onChange={(e) => {
                          editVehicleHook.setFuelType(e.target.value);
                        }}
                        className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                      >
                        <option disabled value={""}>
                          -- Select --
                        </option>
                        {fuelTypeArr?.map((fuel) => (
                          <option key={fuel} value={fuel}>
                            {fuel}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col w-full my-[4px]">
                    <label htmlFor="fuelEff" className="pr-[2px]">
                      Fuel Efficiency
                    </label>
                    <input
                      id="fuelEff"
                      name="fuelEff"
                      type="text"
                      value={editVehicleHook.fuelEfficiency}
                      onChange={(e) =>
                        editVehicleHook.setFuelEfficiency(e.target.valu)
                      }
                      placeholder={editVehicleHook.fuelEfficiency}
                      className="w-full h-[30px] bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                    />
                  </div>
                </div>
              </InputWrapper>
              <InputWrapper
                title={"Body Type, Ground Clearance and Seating Capacity"}
              >
                <div className="p-[8px] w-full text-[12px] flex flex-row gap-[16px]">
                  <div className="flex flex-col w-full my-[4px]">
                    {editVehicleHook.loadingBodyTypes ? (
                      <p>Loading...</p>
                    ) : editVehicleHook.errorBodyTypes ? (
                      <p>Error..</p>
                    ) : (
                      <>
                        <label htmlFor="bodyType" className="pr-[2px]">
                          Body Type
                        </label>
                        <div className="flex">
                          <select
                            id="bodyType"
                            name="bodyType"
                            value={editVehicleHook.bodyType}
                            onChange={(e) => {
                              editVehicleHook.setBodytype(e.target.value);
                            }}
                            className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                          >
                            <option disabled value={[]}>
                              {editVehicleHook.vehicle["Body Type"]}
                            </option>
                            {editVehicleHook.bodyTypesData?.map((body) => (
                              <option key={body._id} value={body.bodytype}>
                                {body.bodytype}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col w-full my-[4px]">
                    <label htmlFor="seat" className="pr-[2px]">
                      Seating Capacity
                    </label>
                    <input
                      id="seat"
                      name="seat"
                      type="number"
                      value={editVehicleHook.seatingCapacity}
                      onChange={(e) =>
                        editVehicleHook.setSeatingCapacity(e.target.value)
                      }
                      placeholder={editVehicleHook.vehicle["Seating Capacity"]}
                      className="w-full h-[30px] bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
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
                      value={editVehicleHook.groundClearance}
                      onChange={(e) =>
                        editVehicleHook.setGroundClearance(e.target.value)
                      }
                      placeholder={
                        editVehicleHook.vehicle["Ground Clearance (range)"]
                      }
                      className="w-full h-[30px] bg-rmlk-dark-lighter text-white placeholder:text-white p-[4px] rounded-md"
                    />
                  </div>
                </div>
              </InputWrapper>
              <InputWrapper title={"Transmission(s)"}>
                <div className="p-[8px] w-full text-[12px] flex gap-[4px]">
                  <div className="flex flex-wrap gap-[2px] py-[4px] w-1/3">
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
                  <div className="flex w-2/3">
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
                      {transmissionTypesArr?.map((transmission) => (
                        <option key={transmission} value={transmission}>
                          {transmission}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        editVehicleHook.handleAddTransmission();
                      }}
                      className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </InputWrapper>
              <InputWrapper title={"Information links"}>
                <div className="flex flex-col w-full">
                  <div className="p-[8px] flex w-full ">
                    <div className="p-[8px] flex flex-col w-2/3">
                      <label htmlFor="link">Link:</label>
                      <input
                        id="link"
                        name="link"
                        type="text"
                        placeholder="www.example.com"
                        value={editVehicleHook.infoLink}
                        onChange={(e) =>
                          editVehicleHook.setInfoLink(e.target.value)
                        }
                        className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
                      />
                    </div>

                    <div className="p-[8px] flex flex-col w-1/3">
                      <label htmlFor="infotag">Tags:</label>
                      <div className="flex">
                        <select
                          id="infotag"
                          name="infotag"
                          value={editVehicleHook.infoTag}
                          className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                          onChange={(e) =>
                            editVehicleHook.setInfoTag(e.target.value)
                          }
                        >
                          <option disabled value={""}>
                            -- Select --
                          </option>
                          {infoTagsArr?.map((tag, index) => (
                            <option key={index} value={tag}>
                              {tag}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={editVehicleHook.handleAddInfoLinks}
                          className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px] h-[30px]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-[2px] px-[8px] py-[4px]">
                    {editVehicleHook.infoLinkList?.map(
                      ({ link, tag }, index) => (
                        <div key={index}>
                          <span
                            className="px-[4px] py-[2px]  text-[10px] text-amber-400 font-semibold hover:cursor-pointer hover:text-white duration-200"
                            onClick={() =>
                              editVehicleHook.handleRemoveInfoLinks(index)
                            }
                          >
                            <FontAwesomeIcon icon={faTimes} />
                            {link} - {tag}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </InputWrapper>
              <div className="p-[8px]">
                <button
                  type="submit"
                  className="mt-[8px] w-full bg-blue-600 hover:bg-blue-500 duration-200 p-[4px] rounded-md shadow-md cursor-pointer text-[12px] font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditVehicleForm;
