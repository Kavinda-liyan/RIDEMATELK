import PageWrapper from "../../components/Assets/PageWrapper";
import {
  useGetBodyTypesQuery,
  useAddBodyTypesMutation,
  useDeleteBodyTypeMutation,
} from "../../app/api/bodyTypesApiSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PopupModal from "../../components/PopupModal";
import WarningIcon from "../../components/Assets/WarningIcon";
import QuestionIcon from "../../components/Assets/QuestionIcon";

const AddVehicles = () => {
  const {
    data: bodyTypes,
    isLoading,
    isError,
    refetch,
  } = useGetBodyTypesQuery();
  const [addBodyTypes] = useAddBodyTypesMutation();
  const [deleteBodyType] = useDeleteBodyTypeMutation();

  const [bodyType, setBodyType] = useState("");
  const [bodyDes, setBodyDes] = useState("");
  const [deleteById, setDeleteById] = useState(null);
  const [bodyToDelete, setBodyToDelete] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleBodyTypes = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    if (!bodyType || !bodyDes) {
      throw new Error("Body Type or Description field is empty ");
    }

    try {
      const res = await addBodyTypes({
        bodytype: bodyType,
        Description: bodyDes,
      }).unwrap();
      setBodyType("");
      setBodyDes("");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBodyType = async (id, body) => {
    setDeleteById(id);
    setBodyToDelete(body);

    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteBodyType(deleteById).unwrap();
      refetch();
      setShowDeleteModal(false);
      setDeleteById(null);
      setBodyToDelete("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageWrapper>
      <>
        <PopupModal
          actionName={"Delete"}
          action={() => confirmDelete()}
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal((prev) => !prev)}
        >
          <div className="text-center p-[8px]">
            <WarningIcon />
            <p className="text-white">
              Do you want to delete "{bodyToDelete}" Body Type ? from Body Type
              Collection{" "}
            </p>
          </div>
        </PopupModal>

        <PopupModal
          actionName={"Add"}
          action={() => confirmSubmit()}
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal((prev) => !prev)}
        >
          <div className="text-center p-[8px]">
            <QuestionIcon />
            <p className="text-white">
              Do you want to add<br></br>
              <span className="font-rmlk-secondary text-[12px]">
                Body Type: "{bodyType}"
              </span>
              <br></br>{" "}
              <span className="font-rmlk-secondary text-[12px]">
                Description: {bodyDes}
              </span>{" "}
              <br></br>to Body Type Collection{" "}
            </p>
          </div>
        </PopupModal>
      </>

      <div className="grid grid-cols-12 gap-[20px]">
        <div className="col-span-4">
          <div className="grid grid-rows-12 gap-[20px]">
            <div className="row-span-6">
              <h3 className="text-[16px] mb-[8px] text-white">
                Add new body type
              </h3>
              <div className="bg-rmlk-dark-light rounded-md shadow-md p-[8px]">
                <div className="flex flex-col font-rmlk-secondary">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : isError ? (
                    <div>Error</div>
                  ) : (
                    <div className="flex flex-wrap gap-[4px] p-[8px]">
                      {bodyTypes.map((bt) => (
                        <div
                          onClick={() =>
                            handleDeleteBodyType(bt._id, bt.bodytype)
                          }
                          key={bt._id}
                          className="flex items-center px-[6px] py-[2px] bg-amber-600 text-[10px] text-white font-semibold rounded-md shadow-md hover:cursor-pointer hover:bg-amber-500 duration-200 "
                        >
                          <span className="">
                            {bt.bodytype.trim().toUpperCase()}{" "}
                          </span>

                          <FontAwesomeIcon
                            className="font-bold"
                            icon={faTimes}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-white font-rmlk-secondary text-[12px] p-[8px]">
                    <form onSubmit={handleBodyTypes}>
                      <div className="flex flex-col gap-[8px] ">
                        <div className="flex flex-col gap-[8px] border p-[8px] rounded-md border-rmlk-dark-lighter">
                          <label htmlFor="bodyType" className="">
                            Body Type :
                          </label>
                          <input
                            id="bodyType"
                            name="bodyType"
                            type="text"
                            placeholder="Add Body Type..."
                            value={bodyType}
                            onChange={(e) => setBodyType(e.target.value)}
                            className="p-[4px] bg-rmlk-dark-lighter rounded-md w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] border p-[8px] rounded-md border-rmlk-dark-lighter">
                          <label htmlFor="bodyDes" className="">
                            Body Description :
                          </label>
                          <textarea
                            rows={3}
                            id="bodyDes"
                            name="bodyDes"
                            type="text"
                            value={bodyDes}
                            onChange={(e) => setBodyDes(e.target.value)}
                            placeholder="Description..."
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
            <div className="row-span-6">
              <h3 className="text-[16px] mb-[8px] text-white">
                Add new Manufacturer
              </h3>
              <div className="bg-rmlk-dark-light rounded-md shadow-md p-[8px]">
                <div className="flex flex-col font-rmlk-secondary">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : isError ? (
                    <div>Error</div>
                  ) : (
                    <div className="flex flex-wrap gap-[4px] p-[8px]">
                      {bodyTypes.map((bt) => (
                        <div
                          onClick={() => handleDeleteBodyType(bt._id)}
                          key={bt._id}
                          className="flex items-center px-[6px] py-[2px] bg-amber-600 text-[10px] text-white font-semibold rounded-md shadow-md hover:cursor-pointer hover:bg-amber-500 duration-200 "
                        >
                          <span className="">
                            {bt.bodytype.trim().toUpperCase()}{" "}
                          </span>

                          <FontAwesomeIcon
                            className="font-bold"
                            icon={faTimes}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-white font-rmlk-secondary text-[12px] p-[8px]">
                    <form onSubmit={handleBodyTypes}>
                      <div className="flex flex-col gap-[8px] ">
                        <div className="flex flex-col gap-[8px] border p-[8px] rounded-md border-rmlk-dark-lighter">
                          <label htmlFor="bodyType" className="">
                            Body Type :
                          </label>
                          <input
                            id="bodyType"
                            name="bodyType"
                            type="text"
                            placeholder="Add Body Type..."
                            value={bodyType}
                            onChange={(e) => setBodyType(e.target.value)}
                            className="p-[4px] bg-rmlk-dark-lighter rounded-md w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] border p-[8px] rounded-md border-rmlk-dark-lighter">
                          <label htmlFor="bodyDes" className="">
                            Body Description :
                          </label>
                          <textarea
                            rows={3}
                            id="bodyDes"
                            name="bodyDes"
                            type="text"
                            value={bodyDes}
                            onChange={(e) => setBodyDes(e.target.value)}
                            placeholder="Description..."
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
          </div>
        </div>
        <div className="col-span-8"> add vehicles</div>
      </div>
    </PageWrapper>
  );
};

export default AddVehicles;
