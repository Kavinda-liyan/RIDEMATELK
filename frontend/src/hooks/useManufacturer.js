import { useState } from "react";
import {
  useGetManufacturerQuery,
  useAddManufacturerMutation,
  useDeleteManufacturerMutation,
} from "../app/api/manufacturerSlice";
import { toast } from "react-toastify";

export const useManufacturer = () => {
  const {
    data: manufaturerData,
    isLoading: loadingManufaturer,
    isError: errorManufacturer,
    refetch: refetchManufacturer,
  } = useGetManufacturerQuery();

  //POST  DELETE
  const [addManufacturer] = useAddManufacturerMutation();
  const [deleteManufacturer] = useDeleteManufacturerMutation();

  //Form state
  const [Manufacturer, setManufacturer] = useState("");
  const [Country, setCountry] = useState("");

  //Model State
  const [showManufacturerModal, setShowManufaturerModal] = useState(false);
  const [showDeleteManufacturerModal, setShowDeleteManufacturerModal] =
    useState(false);
  const [manufacturerDeleteById, setManufacturerDeleteById] = useState(null);
  const [ManufacturerToDelete, setManufacturerToDelete] = useState("");

  //Handle Add manufaturer

  const handleAddManufacturer = (e) => {
    e.preventDefault();
    if (!Manufacturer || !Country) {
      toast.error("Please fill in all fields");
      return;
    }
    setShowManufaturerModal(true);
  };

  const confirmAddManufacturer = async () => {
    if (!Manufacturer || !Country) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await addManufacturer({
        manufacturer: Manufacturer,
        country: Country,
      }).unwrap();
      setCountry("");
      setManufacturer("");
      setShowManufaturerModal(false);
      refetchManufacturer();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add manufacturer");
    }
  };

  //Handle Delete Manufacturer

  const handleDeleteManufacturer = (id, manufacturer) => {
    setManufacturerDeleteById(id);
    setManufacturerToDelete(manufacturer);
    setShowDeleteManufacturerModal(true);
  };

  const confirmDeleteManufacturer = async () => {
    try {
      await deleteManufacturer(manufacturerDeleteById).unwrap();
      refetchManufacturer();
      toast.success(
        `Manufacturer : "${ManufacturerToDelete}" deleted sucessfully`
      );
      setShowDeleteManufacturerModal(false);
      setManufacturerDeleteById(null);
      setManufacturerToDelete("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete manufacturer");
    }
  };

  return {
    manufaturerData,
    loadingManufaturer,
    errorManufacturer,
    refetchManufacturer,
    Manufacturer,
    setManufacturer,
    Country,
    setCountry,
    showManufacturerModal,
    setShowManufaturerModal,
    handleAddManufacturer,
    confirmAddManufacturer,
    showDeleteManufacturerModal,
    setShowDeleteManufacturerModal,
    manufacturerDeleteById,
    setManufacturerDeleteById,
    ManufacturerToDelete,
    setManufacturerToDelete,
    handleDeleteManufacturer,
    confirmDeleteManufacturer,
  };
};
