import { useManufacturer } from "../../../../hooks/useManufacturer";
import PopupModal from "../../../../components/PopupModal";
import WarningIcon from "../../../../components/Assets/WarningIcon";
import QuestionIcon from "../../../../components/Assets/QuestionIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Manufacturer = () => {
  const manufaturerHook = useManufacturer();

  //Add manufacturer modal
  const ManufacturerModals = (
    <>
      <PopupModal
        actionName={"Add"}
        action={manufaturerHook.confirmAddManufacturer}
        isOpen={manufaturerHook.showManufacturerModal}
        onClose={() => manufaturerHook.setShowManufaturerModal((prev) => !prev)}
      >
        <div className="text-center p-[8px]">
          <QuestionIcon />
          <p className="text-white">
            Do you want to add<br></br>
            <span className="font-rmlk-secondary text-[12px]">
              Manufacturer: "{manufaturerHook.Manufacturer}"
            </span>
            <br></br>{" "}
            <span className="font-rmlk-secondary text-[12px]">
              Country/Orgin: {manufaturerHook.Country}
            </span>{" "}
            <br></br>to Manufacturer Type Collection{" "}
          </p>
        </div>
      </PopupModal>

      {/* Delete Manufacturer Modal */}
      <PopupModal
        actionName={"Delete"}
        action={manufaturerHook.confirmDeleteManufacturer}
        isOpen={manufaturerHook.showDeleteManufacturerModal}
        onClose={() =>
          manufaturerHook.setShowDeleteManufacturerModal((prev) => !prev)
        }
      >
        <div className="text-center p-[8px]">
          <WarningIcon />
          <p className="text-white">
            Do you want to delete "{manufaturerHook.ManufacturerToDelete}"
            Manufaturer ? from Manufaturer Collection{" "}
          </p>
        </div>
      </PopupModal>
    </>
  );
  return (
    <>
    <>{ManufacturerModals}</>
      <div className="row-span-6">
        <div className="bg-rmlk-dark-light rounded-md shadow-md p-[8px]">
          <div className="flex flex-col font-rmlk-secondary">
            {manufaturerHook.loadingManufaturer ? (
              <div>Loading...</div>
            ) : manufaturerHook.errorManufacturer ? (
              <div>Error</div>
            ) : (
              <div className="flex flex-wrap gap-[4px] p-[8px]">
                {manufaturerHook.manufaturerData.map((m) => (
                  <div
                    onClick={() =>
                      manufaturerHook.handleDeleteManufacturer(
                        m._id,
                        m.manufacturer
                      )
                    }
                    key={m._id}
                    className="flex items-center px-[6px] py-[2px] bg-amber-600 text-[8px] text-white font-semibold rounded-md shadow-md hover:cursor-pointer hover:bg-amber-500 duration-200 "
                  >
                    <span className="">
                      {m.manufacturer.trim().toUpperCase()}{" "}
                    </span>

                    <FontAwesomeIcon className="font-bold" icon={faTimes} />
                  </div>
                ))}
              </div>
            )}
            <div className="text-white font-rmlk-secondary text-[12px] p-[8px]">
              <form onSubmit={manufaturerHook.handleAddManufacturer}>
                <div className="flex flex-col gap-[8px] ">
                  <div className="flex flex-col gap-[8px] border p-[8px] rounded-md border-rmlk-dark-lighter">
                    <label htmlFor="manufacturer" className="">
                      Manufacturer :
                    </label>
                    <input
                      id="manufacturer"
                      name="manufacturer"
                      type="text"
                      placeholder="Add manufacturer..."
                      value={manufaturerHook.Manufacturer}
                      onChange={(e) =>
                        manufaturerHook.setManufacturer(e.target.value)
                      }
                      className="p-[4px] bg-rmlk-dark-lighter rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px] border p-[8px] rounded-md border-rmlk-dark-lighter">
                    <label htmlFor="country" className="">
                      Country/Origin :
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Add country/orgin..."
                      value={manufaturerHook.Country}
                      onChange={(e) =>
                        manufaturerHook.setCountry(e.target.value)
                      }
                      className="p-[4px] bg-rmlk-dark-lighter rounded-md w-full"
                    />
                  </div>
                  <div>
                    <button
                      className="px-[8px] py-[4px] bg-blue-600 w-full rounded-md shadow-md hover:bg-blue-500 hover:cursor-pointer duration-200"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manufacturer;
