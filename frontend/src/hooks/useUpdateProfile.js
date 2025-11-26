import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slices/authSlice";
import { useUpdateUserMutation } from "../app/api/usersApiSlice";
import { toast } from "react-toastify";

export const useUpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const [openCropperModal, setOpenCropperModal] = useState(false);
  const [openSubmitModal,setOpenSubmitModal]=useState(false)

  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username || "",
        email: userInfo.email || "",
        password: "",
        profilePicture: null,
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCroppedImage = (file) => {
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    setOpenCropperModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);

      if (formData.password) data.append("password", formData.password);
      if (formData.profilePicture)
        data.append("profilePicture", formData.profilePicture);

      const updatedUser = await updateUser(data).unwrap();

      dispatch(setCredentials(updatedUser));
      toast.success("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "" }));
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return {
    userInfo,
    openCropperModal,
    setOpenCropperModal,
    formData,
    handleCroppedImage,
    handleSubmit,
    handleInputChange,
    loadingUpdate,
    openSubmitModal,setOpenSubmitModal
  };
};
