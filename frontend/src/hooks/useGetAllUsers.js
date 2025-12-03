import { useGetAllUsersQuery } from "../app/api/usersApiSlice";
import { useGetAllRatingsQuery } from "../app/api/ratingsApiSlice";
import { useDeleteUserMutation } from "../app/api/usersApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useAddTrustedBatchMutation,
  useRemoveTrustedBatchMutation,
} from "../app/api/usersApiSlice";
export const useGetAllUsers = () => {
  const {
    data: allUserData,
    isLoading: allUserLoading,
    isError: allUserError,
    refetch: refetchUsers,
  } = useGetAllUsersQuery();

  const {
    data: ratingData,
    isLoading: ratingLoading,
    error: ratingError,
    refetch: refetchRatings,
  } = useGetAllRatingsQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [addTrustedBatch] = useAddTrustedBatchMutation();
  const [removeTrustedBatch] = useRemoveTrustedBatchMutation();

  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showFullID, setShowFullID] = useState(null);
  const [showFullEmail, setShowFullEmail] = useState(null);

  const [openConfirmTrustedModal, setOpenConfirmTrustedModal] = useState(false);
  const [selectedTrustedUser, setSelectedTrustedUser] = useState(null);

  const [openRemoveTrustedModal, setOpenRemoveTrustedModal] = useState(false);
  const [selectedUntrustedUser, setSelectedUntrustedUser] = useState(null);

  const UserTitle = [
    "Profile Picture",
    "ID",
    "Name",
    "Email",
    "Role",
    "Top User",
    "Reviews",
    "Batch",
    "Delete",
  ];

  const handleDeleteUser = async (selectedUser) => {
    try {
      await deleteUser(selectedUser._id).unwrap();
      setOpenDeleteModal(false);
      setSelectedUser(null);
      refetchRatings();
      refetchUsers();
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

  const handleTrustedBatch = async (selectedTrustedUser) => {
    try {
      await addTrustedBatch(selectedTrustedUser._id).unwrap();
      setOpenConfirmTrustedModal(false);
      setSelectedTrustedUser(null);
      refetchRatings();
      refetchUsers();
      navigate("/admin/allusers");
      toast.success("Trusted Batch added successfully");
    } catch (error) {
      console.error("Failed to add Trusted Batch: ", error);
      toast.error(
        error?.data?.message ||
          "Failed to add Trusted Batch. Please try again later."
      );
      setSelectedTrustedUser(null);
    }
  };

  const handleRemoveTrustedBatch = async (selectedUntrustedUser) => {
    try {
      await removeTrustedBatch(selectedUntrustedUser._id).unwrap();
      setOpenRemoveTrustedModal(false);
      setSelectedUntrustedUser(null);
      refetchRatings();
      refetchUsers();
      navigate("/admin/allusers");
      toast.success("Trusted Batch removed successfully");
    } catch (error) {
      console.error("Failed to remove Trusted Batch: ", error);
      toast.error(
        error?.data?.message ||
          "Failed to remove Trusted Batch. Please try again later."
      );
      setSelectedUntrustedUser(null);
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
    showFullID,
    setShowFullID,
    showFullEmail,
    setShowFullEmail,
    selectedTrustedUser,
    setSelectedTrustedUser,
    openConfirmTrustedModal,
    setOpenConfirmTrustedModal,
    handleTrustedBatch,
    openRemoveTrustedModal,
    setOpenRemoveTrustedModal,
    selectedUntrustedUser,
    setSelectedUntrustedUser,
    handleRemoveTrustedBatch,
  };
};
