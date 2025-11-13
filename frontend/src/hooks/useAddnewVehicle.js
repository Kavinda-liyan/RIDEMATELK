import { useState } from "react";
import { useGetBodyTypesQuery } from "../app/api/bodyTypesApiSlice";
import { useGetManufacturerQuery } from "../app/api/manufacturerSlice";
import { useAddVehiclesMutation } from "../app/api/vehiclesApiSlice";
import { toast } from "react-toastify";

export const useAddnewVehicle = () => {
  //POST
  const [addVehicles] = useAddVehiclesMutation();

  // Form State
  const [Manufacturer, setManufacturer] = useState("");
  const [VehicleModel, setVehicleModel] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState();
  const [groundClearance, setGroundClearance] = useState();
  const [fuelType, setFuelType] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [year, setYear] = useState(null);
  const [transmissionType, setTransmissionType] = useState("");
  const [infoLink, setInfoLink] = useState("");
  const [infoTag, setInfoTag] = useState("");
  const [gallery, setGallery] = useState([]);

  //List States
  const [yearList, setYearList] = useState([]);
  const [transmmissionList, setTransmissionList] = useState([]);
  const [infoLinkList, setInfoLinkList] = useState([]);

  //Popup modal states
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  const {
    data: manufacturersData,
    isLoading: loadingManufacturersData,
    isError: errorManufacturersData,
  } = useGetManufacturerQuery();

  const {
    data: bodyTypesData,
    isLoading: loadingBodytypesData,
    isError: errorBodyTypesData,
  } = useGetBodyTypesQuery();

  const fuelTypesArr = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissionTypesArr = ["Manual", "Automatic"];
  const linkTagsArr = ["ikman", "riyasewana", "other"];

  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const yearsArr = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleFileSelect = (data) => {
    setGallery((prev) => [...prev, data]);
  };

  const removeGalleryItem = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  //   Handle Add delete Information Link List
  const addInfoLinkToList = (e) => {
    e.preventDefault();
    if (!infoLink || !infoTag) {
      toast.error("Please provide both link and tag before adding.");
    }

    if (infoLink && infoTag) {
      setInfoLinkList((prev) => [...prev, { link: infoLink, tag: infoTag }]);
      setInfoLink("");
      setInfoTag("");
    }
  };

  const removeInfoLinkFromList = (indexToRemove) => {
    setInfoLinkList((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  //Handle add delete Transmission List
  const addTransmissionToList = (e) => {
    e.preventDefault();
    if (transmissionType && !transmmissionList.includes(transmissionType)) {
      setTransmissionList((prev) => [...prev, transmissionType]);
      setTransmissionType("");
    }
  };

  const removeTransmissionFromList = (indexToRemove) => {
    setTransmissionList((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  //Handle add delete Years List
  const addYearToList = (e) => {
    e.preventDefault();
    if (!year) {
      toast.error("Please provide a year before adding.");
    }

    if (year && !yearList.includes(Number(year))) {
      setYearList((prev) => [...prev, Number(year)]);
      setYear("");
    }
  };

  const removeYearFromList = (indexToRemove) => {
    setYearList((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAddVehicleModal = (e) => {
    e.preventDefault();
    if (
      !Manufacturer ||
      !VehicleModel ||
      !bodyType ||
      !seatingCapacity ||
      !groundClearance ||
      !fuelType ||
      !fuelEfficiency ||
      yearList.length == 0 ||
      transmmissionList.length == 0
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setShowAddVehicleModal(true);
  };

  const confirmAddVehicle = async () => {
    try {
      const formData = new FormData();

      formData.append("Manufacturer", Manufacturer);
      formData.append("Model", VehicleModel);
      formData.append("Body Type", bodyType);
      formData.append("Seating Capacity", seatingCapacity);
      formData.append("Ground Clearance (range)", groundClearance);
      formData.append("Fuel Type", fuelType);
      formData.append("Fuel Efficiency", fuelEfficiency);

      formData.append("years", JSON.stringify(yearList));
      formData.append("transmission", JSON.stringify(transmmissionList));
      formData.append("info_links", JSON.stringify(infoLinkList));

      // add images
      gallery.forEach((imgObj) => {
        formData.append("gallery_img", imgObj.file);
      });

      // Send metadata as JSON string
      formData.append(
        "gallery_meta",
        JSON.stringify(gallery.map((img) => ({ tag: img.tag, year: img.year })))
      );

      const res = await addVehicles(formData).unwrap();

      toast.success("Vehicle added successfully");
      // reset form
      setManufacturer("");
      setVehicleModel("");
      setBodyType("");
      setSeatingCapacity();
      setGroundClearance();
      setFuelType("");
      setFuelEfficiency("");
      setYearList([]);
      setTransmissionList([]);
      setInfoLinkList([]);
      setGallery([]);
      setShowAddVehicleModal(false);
    } catch (error) {
      console.error("Add vehicle failed:", error);
      toast.error("Failed to add Vehicle");
    }
  };

  return {
    Manufacturer,
    setManufacturer,
    VehicleModel,
    setVehicleModel,
    bodyType,
    setBodyType,
    seatingCapacity,
    setSeatingCapacity,
    groundClearance,
    setGroundClearance,
    fuelType,
    setFuelType,
    fuelEfficiency,
    setFuelEfficiency,
    year,
    setYear,
    transmissionType,
    setTransmissionType,
    infoLink,
    setInfoLink,
    infoTag,
    setInfoTag,
    yearList,
    setYearList,
    transmmissionList,
    setTransmissionList,
    infoLinkList,
    setInfoLinkList,
    addInfoLinkToList,
    removeInfoLinkFromList,
    addTransmissionToList,
    removeTransmissionFromList,
    addYearToList,
    removeYearFromList,
    manufacturersData,
    loadingManufacturersData,
    errorManufacturersData,
    bodyTypesData,
    errorBodyTypesData,
    loadingBodytypesData,
    fuelTypesArr,
    transmissionTypesArr,
    linkTagsArr,
    yearsArr,
    confirmAddVehicle,
    showAddVehicleModal,
    setShowAddVehicleModal,
    handleAddVehicleModal,
    showAddImageModal,
    setShowAddImageModal,
    handleFileSelect,
    gallery,
    removeGalleryItem,
  };
};
