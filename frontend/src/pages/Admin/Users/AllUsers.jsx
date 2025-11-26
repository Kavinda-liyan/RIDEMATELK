import React from "react";
import PageWrapper from "../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../components/BreadCrumb";
import { useGetAllUsers } from "../../../hooks/useGetAllUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import PopupModel from "../../../components/PopupModal";
import WarningIcon from "../../../components/Assets/WarningIcon";
import imgPlaceholder from "../../../assets/placeholderimg.svg";

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

  return (
    <PageWrapper>
      {deleteUserModel}
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
                    <td className="px-[8px] py-[16px]">{user._id}</td>
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

                    <td className="px-[8px] py-[16px]">{user.username}</td>
                    <td className="px-[8px] py-[16px]">{user.email}</td>
                    <td className={`px-[8px] py-[16px]`}>
                      <span
                        className={`text-[10px] font-semibold py-[2px] px-[4px]  rounded-sm shadow-sm ${
                          user.isAdmin ? "bg-green-600 " : "bg-blue-600"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-[8px] py-[16px] ">
                      {ratingLoading
                        ? "Loading..."
                        : ratingError
                        ? "Error Ratings"
                        : userRatings?.length || "N/A"}
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
