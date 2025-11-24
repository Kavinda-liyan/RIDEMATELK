import React from "react";
import PageWrapper from "../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../components/BreadCrumb";
import { useGetAllUsers } from "../../../hooks/useGetAllUsers";
import { Link, useNavigate } from "react-router-dom";

const AllUsers = () => {
  const {
    UserTitle,
    allUserData,
    allUserError,
    allUserLoading,
    ratingData,
    ratingError,
    ratingLoading,
  } = useGetAllUsers();
  const navigate = useNavigate();

  return (
    <PageWrapper>
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
                console.log("User Ratings:", userRatings);

                const reviewedVehicles = userRatings?.map(
                  (rating) => rating.vehicleId
                );

                const uniqueVehicles = [...new Set(reviewedVehicles)];

                return (
                  <tr
                    key={user._id}
                    className="text-[12px] transition-all duration-200"
                  >
                    <td className="p-2">{user._id}</td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    <td className={`p-2`}>
                      <span
                        className={`text-[10px] font-semibold py-[2px] px-[4px]  rounded-sm shadow-sm ${
                          user.isAdmin ? "bg-green-600 " : "bg-blue-600"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="p-2 ">{userRatings?.length || "N/A"}</td>
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
