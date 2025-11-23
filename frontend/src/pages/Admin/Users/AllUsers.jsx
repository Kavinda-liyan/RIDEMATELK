import React from "react";
import PageWrapper from "../../../components/Assets/PageWrapper";
import BreadCrumb from "../../../components/BreadCrumb";
import { useGetAllUsers } from "../../../hooks/useGetAllUsers";

const AllUsers = () => {
  const { UserTitle, allUserData, allUserError, allUserLoading } =
    useGetAllUsers();

  return (
    <PageWrapper>
      <BreadCrumb links={[{ label: "Users", to: "/admin/allusers" }]} />
      <div className="mt-[20px] bg-rmlk-dark-light  text-white  w-full h-full">
        <table className="w-full table-auto border-collapse p-[8px] text-left font-rmlk-secondary ">
          <thead>
            <tr className="bg-rmlk-dark-lighter border-b border-gray-600 font-rmlk-secondary font-light text-[12px]">
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
                <td>Loading...</td>
              </tr>
            ) : allUserError ? (
              <tr>
                <td>Error...</td>
              </tr>
            ) : (
              allUserData.length > 0 &&
              allUserData.map((user) => (
                <tr
                  key={user._id}
                  className="text-[12px] font-rmlk-secondary transition-all duration-200"
                >
                  <td className="p-2">{user._id}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.isAdmin===true?'Admin':'User'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
};

export default AllUsers;
