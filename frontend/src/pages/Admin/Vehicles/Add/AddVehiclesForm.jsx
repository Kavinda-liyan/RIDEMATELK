import { useAddnewVehicle } from "../../../../hooks/useAddnewVehicle";
import InputWrapper from "../../../../components/Assets/InputWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PopupModal from "../../../../components/PopupModal";
import QuestionIcon from "../../../../components/Assets/QuestionIcon";

const AddVehiclesForm = () => {
  const addNewVehicleHook = useAddnewVehicle();

  const addVehicleModal = (
    <>
      <PopupModal
        action={addNewVehicleHook.confirmAddVehicle}
        actionName={"Add Vehicle"}
        isOpen={addNewVehicleHook.showAddVehicleModal}
        onClose={() => addNewVehicleHook.setShowAddVehicleModal(false)}
      >
        <div className="text-center p-[8px] font-rmlk-secondary text-white flex items-center justify-center flex-col">
          <QuestionIcon />
          <p className=" text-[14px]">Do you want to add</p>

          <p className="text-[12px] flex flex-col">
            <span>
              Manufacture :{addNewVehicleHook.Manufacturer} | Model :
              {addNewVehicleHook.VehicleModel} | Year :
              {addNewVehicleHook.yearList.join(", ")}
            </span>
            <span>
              Body Type :{addNewVehicleHook.bodyType} | Seating Capacity :
              {addNewVehicleHook.seatingCapacity} | Ground Clearance :
              {addNewVehicleHook.groundClearance}
            </span>
            <span>
              Fuel Type :{addNewVehicleHook.fuelType} | Fuel Efficiency :
              {addNewVehicleHook.fuelEfficiency} | Trasmission :
              {addNewVehicleHook.transmmissionList.join(",")}
            </span>
            <span>
              Information Link :{addNewVehicleHook.infoLinkList.join(", ")}
            </span>
          </p>
        </div>
      </PopupModal>
    </>
  );

  return (
    <div className="bg-rmlk-dark-light h-full rounded-md shadow-md">
      <>{addVehicleModal}</>
      <div className="p-[8px] font-rmlk-secondary text-white text-[12px]">
        <h3 className="text-[16px] px-[16px]">Add Vehicles</h3>
        <form
          className="p-[8px]"
          onSubmit={addNewVehicleHook.handleAddVehicleModal}
        >
          <InputWrapper title="Vehicle model and manufacturer information">
            <div className="p-[8px] w-[35%]">
              <label htmlFor="manufacturer" className="mb-[2px] pb-[4px]">
                Manufacturer:
              </label>

              {addNewVehicleHook.loadingManufacturersData ? (
                <>Loading...</>
              ) : addNewVehicleHook.errorManufacturersData ? (
                <>Error...</>
              ) : (
                <select
                  id="manufacturer"
                  name="manufacturer"
                  value={addNewVehicleHook.Manufacturer}
                  className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                  onChange={(e) =>
                    addNewVehicleHook.setManufacturer(e.target.value)
                  }
                >
                  <option disabled value={""}>
                    -- Select --
                  </option>
                  {addNewVehicleHook.manufacturersData?.map((manufact) => (
                    <option key={manufact._id} value={manufact.manufacturer}>
                      {manufact.manufacturer}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="p-[8px] flex flex-col w-[35%]">
              <label htmlFor="manufacturer">Model:</label>
              <input
                id="model"
                name="model"
                type="text"
                value={addNewVehicleHook.VehicleModel}
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
                onChange={(e) =>
                  addNewVehicleHook.setVehicleModel(e.target.value)
                }
              />
            </div>
            <div className="p-[8px] flex flex-col w-[30%]">
              <div>
                <label htmlFor="year">Year:</label>
                <div className="flex">
                  <select
                    id="year"
                    name="year"
                    value={addNewVehicleHook.year}
                    onChange={(e) => {
                      addNewVehicleHook.setYear(e.target.value);
                    }}
                    className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                  >
                    <option disabled value={""}>
                      -- Select --
                    </option>
                    {addNewVehicleHook.yearsArr?.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={addNewVehicleHook.addYearToList}
                    className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px]"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-wrap gap-[2px] py-[4px]">
                  {addNewVehicleHook.yearList?.map((year, index) => (
                    <span
                      className="flex items-center px-[4px] py-[2px] text-[10px] text-white/40 font-semibold  hover:cursor-pointer hover:text-white duration-200 "
                      key={index}
                      onClick={() =>
                        addNewVehicleHook.removeYearFromList(index)
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} className="pr-[2px]" />
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </InputWrapper>
          <InputWrapper title="Vehicle structural specifications">
            <div className="p-[8px] w-[35%]">
              <label htmlFor="bodytype" className="mb-[2px] pb-[4px]">
                Body Type:
              </label>

              {addNewVehicleHook.loadingBodytypesData ? (
                <>Loading...</>
              ) : addNewVehicleHook.errorBodyTypesData ? (
                <>Error...</>
              ) : (
                <select
                  id="bodytype"
                  name="bodytype"
                  value={addNewVehicleHook.bodyType}
                  onChange={(e) =>
                    addNewVehicleHook.setBodyType(e.target.value)
                  }
                  className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                >
                  <option disabled value={""}>
                    -- Select --
                  </option>
                  {addNewVehicleHook.bodyTypesData?.map((bodytype) => (
                    <option key={bodytype._id} value={bodytype.bodytype}>
                      {bodytype.bodytype}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="p-[8px] flex flex-col w-[35%]">
              <label htmlFor="seating">Seating Capacity:</label>
              <input
                id="seating"
                name="seating"
                type="number"
                value={addNewVehicleHook.seatingCapacity}
                onChange={(e) =>
                  addNewVehicleHook.setSeatingCapacity(Number(e.target.value))
                }
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
            <div className="p-[8px] flex flex-col w-[30%]">
              <label htmlFor="ground">Ground Clearance:</label>
              <input
                id="ground"
                name="ground"
                type="number"
                value={addNewVehicleHook.groundClearance}
                onChange={(e) =>
                  addNewVehicleHook.setGroundClearance(Number(e.target.value))
                }
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
          </InputWrapper>

          <InputWrapper title="Vehicle fuel and transmission specifications">
            <div className="p-[8px] w-[35%]">
              <label htmlFor="fueltype" className="mb-[2px] pb-[4px]">
                Fuel Type:
              </label>

              <select
                id="fueltype"
                name="fueltype"
                value={addNewVehicleHook.fuelType}
                className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                onChange={(e) => addNewVehicleHook.setFuelType(e.target.value)}
              >
                <option disabled value={""}>
                  -- Select --
                </option>
                {addNewVehicleHook.fuelTypesArr?.map((fueltype) => (
                  <option key={fueltype} value={fueltype}>
                    {fueltype}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-[8px] flex flex-col w-[30%]">
              <label htmlFor="fueleff">Fuel Efficiency:</label>
              <input
                id="fueleff"
                name="fueleff"
                type="text"
                value={addNewVehicleHook.fuelEfficiency}
                onChange={(e) =>
                  addNewVehicleHook.setFuelEfficiency(e.target.value)
                }
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
            <div className="p-[8px] w-[35%]">
              <div>
                <label htmlFor="transmission">Transmission Type:</label>
                <div className="flex">
                  <select
                    id="transmission"
                    name="transmission"
                    value={addNewVehicleHook.transmissionType}
                    onChange={(e) =>
                      addNewVehicleHook.setTransmissionType(e.target.value)
                    }
                    className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                  >
                    <option disabled value={""}>
                      -- Select --
                    </option>
                    {addNewVehicleHook.transmissionTypesArr?.map(
                      (transmission) => (
                        <option key={transmission} value={transmission}>
                          {transmission}
                        </option>
                      )
                    )}
                  </select>
                  <button
                    onClick={addNewVehicleHook.addTransmissionToList}
                    className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-[2px] py-[4px]">
                {addNewVehicleHook.transmmissionList?.map(
                  (transmission, index) => (
                    <span
                      className="px-[4px] py-[2px] text-[10px] text-white/40 font-semibold  hover:cursor-pointer hover:text-white duration-200"
                      key={index}
                      onClick={() =>
                        addNewVehicleHook.removeTransmissionFromList(index)
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} className="pr-[2px]" />
                      {transmission}
                    </span>
                  )
                )}
              </div>
            </div>
          </InputWrapper>

          <InputWrapper title={"Information links"}>
            <div className="p-[8px] flex flex-col w-[50%]">
              <label htmlFor="link">Link:</label>
              <input
                id="link"
                name="link"
                type="link"
                value={addNewVehicleHook.infoLink}
                onChange={(e) => addNewVehicleHook.setInfoLink(e.target.value)}
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
            <div className="p-[8px] flex flex-col w-[50%]">
              <div className="">
                <label htmlFor="infotag">Tags:</label>
                <div className="flex">
                  <select
                    id="infotag"
                    name="infotag"
                    value={addNewVehicleHook.infoTag}
                    className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                    onChange={(e) =>
                      addNewVehicleHook.setInfoTag(e.target.value)
                    }
                  >
                    <option disabled value={""}>
                      -- Select --
                    </option>
                    {addNewVehicleHook.linkTagsArr?.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={addNewVehicleHook.addInfoLinkToList}
                    className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px] h-[30px]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-[2px] py-[4px]">
                {addNewVehicleHook.infoLinkList?.map(({ link, tag }, index) => (
                  <div key={index}>
                    <span
                      className="px-[4px] py-[2px]  text-[10px] text-white/40 font-semibold hover:cursor-pointer hover:text-white duration-200"
                      onClick={() =>
                        addNewVehicleHook.removeInfoLinkFromList(index)
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                      {link} - {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </InputWrapper>
          {/* <InputWrapper title={"Gallery Images"}>
            <div className="p-[8px] flex flex-col w-[50%]">
              <label htmlFor="link">Image:</label>
              <input
                id="link"
                name="link"
                type="link"
                value={infoLink}
                onChange={(e) => setInfoLink(e.target.value)}
                className="bg-rmlk-dark-lighter p-[4px] rounded-md h-[30px]"
              />
            </div>
            <div className="p-[8px] flex flex-col w-[50%]">
              <div className="">
                <label htmlFor="infotag">Tags:</label>
                <div className="flex">
                  <select
                    id="infotag"
                    name="infotag"
                    value={infoTag}
                    className="w-full h-[30px] p-[4px] bg-rmlk-dark-lighter rounded-md"
                    onChange={(e) => setInfoTag(e.target.value)}
                  >
                    <option disabled value={""}>
                      -- Select --
                    </option>
                    {linkTags?.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={addInfoLinkToList}
                    className="p-[2px] bg-blue-600 rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 mx-[4px] w-[30px] duration-200 text-[16px] h-[30px]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-[2px] py-[4px]">
                {infoLinkList?.map(({ link, tag }, index) => (
                  <div key={index}>
                    <span
                      className="px-[6px] py-[2px] bg-amber-600 text-[8px] text-white font-semibold rounded-md shadow-md hover:cursor-pointer hover:bg-amber-500 duration-200"
                      onClick={removeInfoLinkFromList}
                    >
                      {link} - {tag} <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </InputWrapper> */}
          <div className="p-[8px] w-full">
            <button
              className="p-[4px] bg-blue-600 w-full rounded-md shadow-md hover:cursor-pointer hover:bg-blue-500 duration-200 text-white font-semibold"
              type="submit"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehiclesForm;
