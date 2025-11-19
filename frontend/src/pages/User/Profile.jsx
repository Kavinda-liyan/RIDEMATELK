import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../app/api/usersApiSlice";
import imgPlaceholder from "../../assets/placeholderimg.svg";
import { toast } from "react-toastify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  // Initialize form data from userInfo
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

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Always append fields (even empty) to FormData
      data.append("username", formData.username);
      data.append("email", formData.email);

      if (formData.password) data.append("password", formData.password);
      if (formData.profilePicture)
        data.append("profilePicture", formData.profilePicture);

      await updateUser(data).unwrap();
      toast.success("Profile updated successfully!");

      // Clear password after submission
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <section className="h-dvh bg-rmlk-dark pl-[60px] pr-[60px] pt-[50px]">
      <div className="h-full w-full flex flex-col items-center justify-start text-white gap-8">
        <div></div>
        {/* Profile Picture */}

        {/* Profile Form */}

        <form
          onSubmit={handleSubmit}
          className="w-[50%] bg-rmlk-dark-light rounded-sm shadow-md p-[16px] flex flex-col gap-4 font-rmlk-secondary text-[12px]"
        >
          <div className="w-full flex items-center justify-center flex-col gap-[16px]">
            <div className="w-[100px] h-[100px] overflow-hidden rounded-full border-2 border-rmlk-dark-lighter shadow-md cursor-pointer">
              <img
                src={
                  formData.profilePicture
                    ? URL.createObjectURL(formData.profilePicture)
                    : userInfo.profilePicture || imgPlaceholder
                }
                alt="Profile"
                className="h-full w-full object-cover"
                onClick={handleImageClick}
              />
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
              
            </div>
            <h3>{userInfo.username}</h3>
          </div>

          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-rmlk-dark-lighter text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-rmlk-dark-lighter text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Leave blank to keep current"
              className="w-full p-2 rounded bg-rmlk-dark-lighter text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-rmlk-light bg-blue-600 py-2 px-4 rounded hover:bg-rmlk-light/80"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
