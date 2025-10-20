import { useState } from "react";

import {
  useGetBodyTypesQuery,
  useAddBodyTypesMutation,
  useDeleteBodyTypeMutation,
} from "../app/api/bodyTypesApiSlice";
import { toast } from "react-toastify";

export const useBodyTypes = () => {
  // fetch
  const {
    data: bodyTypesData,
    isLoading: loadingBodyTypes,
    isError: errorBodyTypes,
    refetch: refetchBodyTypes,
  } = useGetBodyTypesQuery();

  //POST,DELETE
  const [addBodyTypes] = useAddBodyTypesMutation();
  const [deleteBodyType] = useDeleteBodyTypeMutation();

  //Form state
  const [bodyType, setBodyType] = useState("");
  const [bodyDescription, setBodyDescription] = useState("");

  //Model State
  const [showAddBodyTypeModal, setShowAddBodyTypeModal] = useState(false);
  const [showDeleteBodyTypeModal, setShowDeleteBodyTypeModal] = useState(false);
  const [BodyTypeDeleteById, setBodyTypeDeleteById] = useState(null);
  const [BodyTypeToDelete, setBodyTypeToDelete] = useState("");

  //Handle Add Body Type
  const handleAddBodyType = (e) => {
    e.preventDefault();
    if (!bodyType || !bodyDescription) {
      toast.error("Please fill in all fields");
      return;
    }
    setShowAddBodyTypeModal(true);
  };

  const confirmAddBodyType = async () => {
    if (!bodyType || !bodyDescription) {
      setShowAddBodyTypeModal(false);
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await addBodyTypes({
        bodytype: bodyType,
        Description: bodyDescription,
      }).unwrap();

      setBodyType("");
      setBodyDescription("");
      setShowAddBodyTypeModal(false);
      refetchBodyTypes();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add body type");
    }
  };

  //delete Body Type
  const handleDeleteBodyType = (id, bodyType) => {
    setBodyTypeDeleteById(id);
    setBodyTypeToDelete(bodyType);
    setShowDeleteBodyTypeModal(true);
  };

  const confirmDeleteBodyType = async () => {
    try {
      await deleteBodyType(BodyTypeDeleteById).unwrap();
      refetchBodyTypes();
      toast.success(`Body Type : "${BodyTypeToDelete}" deleted sucessfully`);
      setShowDeleteBodyTypeModal(false);
      setBodyTypeDeleteById(null);
      setBodyTypeToDelete("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Body Type");
    }
  };

  return {
    bodyTypesData,
    loadingBodyTypes,
    errorBodyTypes,
    refetchBodyTypes,
    bodyType,
    setBodyType,
    bodyDescription,
    setBodyDescription,
    showAddBodyTypeModal,
    setShowAddBodyTypeModal,
    showDeleteBodyTypeModal,
    setShowDeleteBodyTypeModal,
    BodyTypeDeleteById,
    setBodyTypeDeleteById,
    BodyTypeToDelete,
    setBodyTypeToDelete,
    handleAddBodyType,
    confirmAddBodyType,
    handleDeleteBodyType,
    confirmDeleteBodyType,
  };
};
