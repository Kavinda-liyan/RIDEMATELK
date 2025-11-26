import { useGetAllUsersQuery } from "../app/api/usersApiSlice";
import { useGetAllRatingsQuery } from "../app/api/ratingsApiSlice";
import { useDeleteUserMutation } from "../app/api/usersApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const useGetAllUsers = () => {
  const {
    data: allUserData,
    isLoading: allUserLoading,
    isError: allUserError,
  } = useGetAllUsersQuery();

  const {
    data: ratingData,
    isLoading: ratingLoading,
    error: ratingError,
    refetch: refetchRatings,
  } = useGetAllRatingsQuery();

  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const UserTitle = ["ID","Profile Picture", "Name", "Email", "Role", "Reviews", "Delete"];

  const handleDeleteUser = async (selectedUser) => {
    try {
      await deleteUser(selectedUser._id).unwrap();
      setOpenDeleteModal(false);
      setSelectedUser(null);
      refetchRatings();
      navigate("/admin/allusers");
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete the user: ", error);
      toast.error(
        error?.data?.message ||
          "Failed to delete the user. Please try again later."
      );
      setSelectedUser(null);
      setOpenDeleteModal(false);
    }
  };

  return {
    allUserData,
    allUserLoading,
    allUserError,
    UserTitle,
    ratingData,
    ratingError,
    ratingLoading,
    openDeleteModal,
    setOpenDeleteModal,
    selectedUser,
    setSelectedUser,
    handleDeleteUser,
  };
};
