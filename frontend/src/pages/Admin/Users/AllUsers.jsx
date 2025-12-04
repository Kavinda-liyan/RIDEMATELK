import React from "react";
import PageWrapper from "../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../components/BreadCrumb";
import { useGetAllUsers } from "../../../hooks/useGetAllUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeLowVision,
  faMedal,
  faStar,
  faStarAndCrescent,
  faStepForward,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import PopupModel from "../../../components/PopupModal";
import WarningIcon from "../../../components/Assets/WarningIcon";
import imgPlaceholder from "../../../assets/placeholderimg.svg";
import QuestionIcon from "../../../components/Assets/QuestionIcon";

const AllUsers = () => {
  const {
    UserTitle,
    allUserData,
    allUserError,
    allUserLoading,
    ratingData,
    ratingError,
    ratingLoading,
    openDeleteModal,
    setOpenDeleteModal,
    selectedUser,
    setSelectedUser,
    handleDeleteUser,
    showFullID,
    setShowFullID,
    showFullEmail,
    setShowFullEmail,
    selectedTrustedUser,
    setSelectedTrustedUser,
    setOpenConfirmTrustedModal,
    openConfirmTrustedModal,
    handleTrustedBatch,
    openRemoveTrustedModal,
    setOpenRemoveTrustedModal,
    selectedUntrustedUser,
    setSelectedUntrustedUser,
    handleRemoveTrustedBatch,
  } = useGetAllUsers();

  const deleteUserModel = (
    <>
      <PopupModel
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        actionName={"Delete"}
        action={() => handleDeleteUser(selectedUser)}
      >
        <div className="flex items-center justify-center text-white flex-col font-rmlk-secondary">
          <WarningIcon />
          <h2 className="text-[16px]  text-center">
            Are you sure you want to delete this User?
          </h2>
          <div className="max-h-[300px] overflow-y-scroll w-full"></div>
        </div>
      </PopupModel>
    </>
  );

  const trustedUserModel = (
    <>
      <PopupModel
        isOpen={openConfirmTrustedModal}
        onClose={() => setOpenConfirmTrustedModal(false)}
        actionName={"Add Batch"}
        action={() => handleTrustedBatch(selectedTrustedUser)}
      >
        <div className="flex items-center justify-center text-white flex-col font-rmlk-secondary">
          <QuestionIcon />
          <h2 className="text-[16px]  text-center">
            Are you sure you want to add this user to trusted batch?
          </h2>
          <div className="max-h-[300px] overflow-y-scroll w-full"></div>
        </div>
      </PopupModel>
    </>
  );

  const removeTrustedUserModel = (
    <>
      <PopupModel
        isOpen={openRemoveTrustedModal}
        onClose={() => setOpenRemoveTrustedModal(false)}
        actionName={"Remove Batch"}
        action={() => handleRemoveTrustedBatch(selectedUntrustedUser)}
      >
        <div className="flex items-center justify-center text-white flex-col font-rmlk-secondary">
          <WarningIcon />
          <h2 className="text-[16px]  text-center">
            Are you sure you want to remove this "Trusted User" batch?
          </h2>
          <div className="max-h-[300px] overflow-y-scroll w-full"></div>
        </div>
      </PopupModel>
    </>
  );

  return (
    <PageWrapper>
      {deleteUserModel}
      {trustedUserModel}
      {removeTrustedUserModel}
      <BreadCrumb links={[{ label: "Users", to: "/admin/allusers" }]} />

      <div className="mt-[20px] bg-rmlk-dark-light text-white w-full h-[420px] overflow-y-auto">
        <table className="w-full table-auto border-collapse p-[8px] text-left font-rmlk-secondary">
          <thead>
            <tr className="bg-rmlk-dark-lighter border-b border-gray-600 font-light text-[12px]">
              {UserTitle.map((title) => (
                <th key={title} className="p-2">
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {allUserLoading ? (
              <tr>
                <td className="p-2">Loading...</td>
              </tr>
            ) : allUserError ? (
              <tr>
                <td className="p-2">Error loading users...</td>
              </tr>
            ) : (
              allUserData.length > 0 &&
              allUserData.map((user) => {
                const userRatings = ratingData?.filter(
                  (rating) => rating?.userId?._id === user._id
                );

                return (
                  <tr
                    key={user._id}
                    className="text-[12px] transition-all duration-200"
                  >
                    <td className="px-[8px] py-[16px]">
                      <img
                        src={
                          user.profilePicture
                            ? user.profilePicture
                            : imgPlaceholder
                        }
                        alt="Profile"
                        className="h-[40px] w-[40px] object-cover rounded-full"
                      />
                    </td>
                    <td className={`px-[8px] py-[16px]  `}>
                      <div className="flex items-center gap-[4px] transition-all duration-200">
                        <p
                          className={`${
                            showFullID === user._id
                              ? "w-auto"
                              : "truncate w-[50px] inline-block"
                          } `}
                        >
                          {user._id}
                        </p>
                        <button
                          onClick={() =>
                            setShowFullID(
                              showFullID === user._id ? null : user._id
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-500 duration-200 px-[4px] py-[4px] flex items-center text-[8px] font-semibold rounded-sm shadow-md cursor-pointer"
                        >
                          {showFullID === user._id ? (
                            <FontAwesomeIcon icon={faEyeLowVision} />
                          ) : (
                            <FontAwesomeIcon icon={faEye} />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="px-[8px] py-[16px]">{user.username}</td>
                    <td className="px-[8px] py-[16px]  ">
                      <div className="flex items-center gap-[4px] transition-all duration-200">
                        <p
                          className={`${
                            showFullEmail === user.email
                              ? "w-auto"
                              : "truncate w-[50px] inline-block"
                          } `}
                        >
                          {user.email}
                        </p>
                        <button
                          onClick={() =>
                            setShowFullEmail(
                              showFullEmail === user.email ? null : user.email
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-500 duration-200 px-[4px] py-[4px] flex items-center text-[8px] font-semibold rounded-sm shadow-md cursor-pointer"
                        >
                          {showFullEmail === user.email ? (
                            <FontAwesomeIcon icon={faEyeLowVision} />
                          ) : (
                            <FontAwesomeIcon icon={faEye} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className={`px-[8px] py-[16px]`}>
                      <span
                        className={`text-[10px] font-semibold py-[2px] px-[8px]  rounded-full shadow-sm ${
                          user.isAdmin ? "bg-green-600 " : "bg-blue-600"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-[8px] py-[16px]">
                      {user.isTrustedBatch ? (
                        <span className="text-[10px] bg-amber-600 px-[8px] py-[2px] rounded-full shadow-md font-semibold ">
                          <FontAwesomeIcon icon={faMedal} /> Top User
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-[8px] py-[16px] ">
                      {ratingLoading
                        ? "Loading..."
                        : ratingError
                        ? "Error Ratings"
                        : userRatings?.length || "N/A"}
                    </td>
                    <td className="px-[8px] py-[16px] ">
                      {!user.isTrustedBatch ? (
                        <button
                          onClick={() => {
                            setOpenConfirmTrustedModal(true);
                            setSelectedTrustedUser(user);
                          }}
                          className="h-[30px] w-[30px] bg-green-600 rounded-sm flex items-center justify-center cursor-pointer hover:bg-green-500 duration-200"
                        >
                          <span className="font-bold">+</span>
                          <FontAwesomeIcon icon={faMedal} />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setOpenRemoveTrustedModal(true);
                            setSelectedUntrustedUser(user);
                          }}
                          className="h-[30px] w-[30px] bg-rmlk-red rounded-sm flex items-center justify-center cursor-pointer hover:bg-rmlk-red-light duration-200"
                        >
                          <span className="font-bold">-</span>
                          <FontAwesomeIcon icon={faMedal} />
                        </button>
                      )}
                    </td>
                    {!user.isAdmin && (
                      <td className="px-[8px] py-[16px] ">
                        <button
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setSelectedUser(user);
                          }}
                          className="h-[30px] w-[30px] bg-rmlk-red rounded-sm flex items-center justify-center cursor-pointer hover:bg-rmlk-red-light duration-200"
                        >
                          <FontAwesomeIcon icon={faUserMinus} />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
};

export default AllUsers;
