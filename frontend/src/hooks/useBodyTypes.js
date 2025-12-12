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
  const [purpose, setPurpose] = useState("");
  const [purposeToList, setPurposeToList] = useState([]);
  const [icon, setIcon] = useState(null);

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
      const formData = new FormData();
      formData.append("bodytype", bodyType);
      formData.append("Description", bodyDescription);
      formData.append("Purpose", JSON.stringify(purposeToList));
      if (icon) formData.append("icon", icon); 

      await addBodyTypes(formData).unwrap();

      setBodyType("");
      setBodyDescription("");
      setPurpose("");
      setPurposeToList([]);
      setIcon(null);

      setShowAddBodyTypeModal(false);
      refetchBodyTypes();

      toast.success("Body Type added successfully!");
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
      setIcon(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Body Type");
    }
  };

  const addPurposeToList = (e) => {
    e.preventDefault();
    if (!purpose) {
      toast.error("Please provide a purpose before adding.");
    }

    if (purpose && !purposeToList.includes(purpose)) {
      setPurposeToList((prev) => [...prev, purpose]);
      setPurpose("");
    }
  };

  const removePurposeFromList = (indexToRemove) => {
    setPurposeToList((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
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
    purpose,
    setPurpose,
    addPurposeToList,
    purposeToList,
    setPurposeToList,
    removePurposeFromList,
    icon,
    setIcon,
  };
};
