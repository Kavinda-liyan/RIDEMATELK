import { useNavigate, useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../app/api/vehiclesApiSlice";
import { useEffect, useState } from "react";
import { useGetBodyTypesQuery } from "../app/api/bodyTypesApiSlice";
import { useUpdateVehicleMutation } from "../app/api/vehiclesApiSlice";
import { toast } from "react-toastify";
import { vehicleUtils } from "../utils/vehicleUtils";

export const useEditVehicle = () => {
  const { fuelTypeArr } = vehicleUtils();
  const [updateVehicle, { isLoading, isError }] = useUpdateVehicleMutation();
  const {
    data: bodyTypesData,
    isLoading: loadingBodyTypes,
    isError: errorBodyTypes,
  } = useGetBodyTypesQuery();
  const { id } = useParams();

  const {
    data: vehicle,
    isLoading: loadVehicle,
    isError: errorVehicle,
    refetch,
  } = useGetVehicleByIdQuery(id);

  const navigate = useNavigate();

  //Update Form States
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [yearsArr, setYearsArr] = useState([]);
  const [transmissionArr, setTransmissionArr] = useState([]);
  const [fuelType, setFuelType] = useState("");
  const [bodyType, setBodytype] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [groundClearance, setGroundClearance] = useState("");

  //Popup modal states
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  //State for info links
  const [infoTag, setInfoTag] = useState("");
  const [infoLink, setInfoLink] = useState("");
  const [infoLinkList, setInfoLinkList] = useState([]);

  //State for gallery images
  const [galleryImages, setGalleryImages] = useState([]);
  const [newgalleryImage, setNewGalleryImage] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  //Mutate States
  const [newYear, setNewYear] = useState("");
  const [newTransmission, setNewTransmission] = useState("");

  useEffect(() => {
    if (!vehicle) return;

    setManufacturer(vehicle.Manufacturer.toLowerCase());
    setModel(vehicle.Model);
    setYearsArr(vehicle.years);
    setTransmissionArr(vehicle.transmission);
    setFuelType(vehicle["Fuel Type"]);
    setBodytype(vehicle["Body Type"]);
    setSeatingCapacity(vehicle["Seating Capacity"]);
    setFuelEfficiency(vehicle["EFF (km/l)/(km/kwh)"]);
    setGroundClearance(vehicle["Ground Clearance (range)"]);
    setInfoTag(vehicle.info_links?.tag);
    setInfoLink(vehicle.info_links?.link);
    setInfoLinkList(vehicle.info_links || []);
    if (galleryImages.length === 0) {
      setGalleryImages(vehicle.gallery_img || []);
    }
  }, [vehicle]);

  //Year Handlers
  const handleRemoveYear = (yearToRemove) => {
    setYearsArr(yearsArr.filter((y) => y !== yearToRemove));
  };
  const handleAddYear = () => {
    try {
      if (newYear && !yearsArr.includes(newYear)) {
        setYearsArr([...yearsArr, newYear]);
        setNewYear("");
      }
    } catch (error) {
      console.error("Error adding year:", error);
    }
  };

  //Transmission Handlers
  const handleRemoveTransmission = (transmissionToRemove) => {
    setTransmissionArr(
      transmissionArr.filter((t) => t !== transmissionToRemove)
    );
  };

  const handleAddTransmission = () => {
    try {
      if (newTransmission && !transmissionArr.includes(newTransmission)) {
        setTransmissionArr([...transmissionArr, newTransmission]);
        setNewTransmission("");
      }
    } catch (error) {
      console.error("Error adding transmission:", error);
    }
  };

  //Info link handlers
  const handleRemoveInfoLinks = (indexToRemove) => {
    setInfoLinkList((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddInfoLinks = () => {
    try {
      if (infoLink && infoTag) {
        setInfoLinkList([...infoLinkList, { link: infoLink, tag: infoTag }]);
        setInfoLink("");
        setInfoTag("");
      } else {
        toast.error("Info link and tag cannot be empty");
        setInfoLink("");
        setInfoTag("");
      }
    } catch (error) {
      console.error("Error adding info link:", error);
      toast.error("Error adding info link");
    }
  };

  //Gallery Image Handlers
  const handleRemoveGalleryImage = (indexToRemove) => {
    const imgToRemove = galleryImages[indexToRemove];

    //s3 key to remove
    setRemovedImages((prev) => [...prev, imgToRemove.url]);

    setGalleryImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFileSelect = (data) => {
    setNewGalleryImage((prev) => [...prev, data]);
  };
  const handleRemoveNewGalleryImage = (indexToRemove) => {
    setNewGalleryImage((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("Manufacturer", manufacturer);
    formData.append("Model", model);
    formData.append("Body Type", bodyType);
    formData.append("Seating Capacity", Number(seatingCapacity));
    formData.append("Fuel Type", fuelType);
    formData.append("Fuel Efficiency", fuelEfficiency);
    formData.append("Ground Clearance (range)", Number(groundClearance));

    formData.append("years", JSON.stringify(yearsArr));
    formData.append("transmission", JSON.stringify(transmissionArr));
    formData.append("info_links", JSON.stringify(infoLinkList));

    //S3 images to remove
    formData.append("removedImages", JSON.stringify(removedImages));

    //add new images
    newgalleryImage.forEach((imgObj) => {
      formData.append("gallery_img", imgObj.file);
    });
    //metadata for new images
    formData.append(
      "gallery_meta",
      JSON.stringify(
        newgalleryImage.map((img) => ({ tag: img.tag, year: img.year }))
      )
    );

    // const updateData = {
    //   Manufacturer: manufacturer,
    //   Model: model,
    //   years: yearsArr,
    //   transmission: transmissionArr,
    //   "Fuel Type": fuelType,
    //   "Body Type": bodyType,
    //   "Seating Capacity": Number(seatingCapacity),
    //   "Fuel Efficiency": fuelEfficiency,
    //   "Ground Clearance (range)": Number(groundClearance),
    //   info_links: infoLinkList,
    // };

    try {
      const res = await updateVehicle({
        id: vehicle._id,
        body: formData,
      }).unwrap();
      toast.success("Vehicle updated successfully!");
      refetch();
      setNewGalleryImage([]);
      setRemovedImages([]);
    } catch (error) {
      toast.error(`Update failed: ${error?.data?.message || error.message}`);
    }
  };

  return {
    vehicle,
    loadVehicle,
    errorVehicle,
    yearsArr,
    handleRemoveYear,
    newYear,
    setNewYear,
    handleAddYear,
    transmissionArr,
    handleRemoveTransmission,
    handleAddTransmission,
    newTransmission,
    setNewTransmission,
    fuelTypeArr,
    setFuelType,
    fuelType,
    bodyTypesData,
    loadingBodyTypes,
    errorBodyTypes,
    bodyType,
    setBodytype,
    setManufacturer,
    manufacturer,
    model,
    setModel,
    fuelEfficiency,
    setFuelEfficiency,
    seatingCapacity,
    setSeatingCapacity,
    groundClearance,
    setGroundClearance,
    handleFormSubmit,
    infoLinkList,
    setInfoLinkList,
    infoTag,
    setInfoTag,
    infoLink,
    setInfoLink,
    handleRemoveInfoLinks,
    handleAddInfoLinks,
    galleryImages,
    setGalleryImages,
    handleRemoveGalleryImage,
    showAddImageModal,
    setShowAddImageModal,
    handleFileSelect,
    newgalleryImage,
    setNewGalleryImage,
    handleRemoveNewGalleryImage,
    removedImages,
  };
};
