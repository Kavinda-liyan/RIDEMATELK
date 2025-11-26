import imgPlaceholder from "../../assets/placeholderimg.svg";
import ProfileImageModal from "../../components/ProfileImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import PopupModal from "../../components/PopupModal";
import QuestionIcon from "../../components/Assets/QuestionIcon";
import { motion } from "framer-motion";

const UpdateProfile = () => {
  const {
    userInfo,
    openCropperModal,
    setOpenCropperModal,
    formData,
    handleCroppedImage,
    handleSubmit,
    handleInputChange,
    loadingUpdate,
    openSubmitModal,
    setOpenSubmitModal,
  } = useUpdateProfile();

  const handleSubmitModal = (
    <PopupModal
      isOpen={openSubmitModal}
      onClose={() => setOpenSubmitModal(false)}
      actionName={"Update Profile"}
      action={handleSubmit}
    >
      <div className="flex items-center justify-center text-white flex-col font-rmlk-secondary">
        <QuestionIcon />
        <h2 className="text-[16px]  text-center">
          Are you sure you want to update your profile?
        </h2>
        <div className="max-h-[300px] overflow-y-scroll w-full"></div>
      </div>
    </PopupModal>
  );

  return (
    <section className="h-dvh bg-rmlk-dark pl-[60px] pr-[60px] pt-[50px] font-rmlk-secondary">
      {handleSubmitModal}
      {/* Cropper Modal */}
      <ProfileImageModal
        onClose={() => setOpenCropperModal(false)}
        isOpen={openCropperModal}
        onFileSelect={handleCroppedImage}
        existingFiles={formData.profilePicture ? [formData.profilePicture] : []}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-full w-full flex flex-col items-center justify-center text-white gap-8"
      >
        <form
          onSubmit={handleSubmit}
          className="w-[50%] bg-rmlk-dark-light rounded-sm shadow-md p-[16px] flex flex-col gap-4 font-rmlk-secondary text-[12px]"
        >
          <div className="w-full flex items-center justify-center flex-col gap-[16px]">
            <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full border-2 border-rmlk-dark-lighter shadow-md cursor-pointer hover:border-blue-600 duration-200">
              <img
                src={
                  formData.profilePicture
                    ? URL.createObjectURL(formData.profilePicture)
                    : userInfo.profilePicture || imgPlaceholder
                }
                alt="Profile"
                className="h-full w-full object-cover"
                onClick={() => setOpenCropperModal(true)}
              />
              <div
                onClick={() => setOpenCropperModal(true)}
                className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
              >
                <FontAwesomeIcon icon={faCamera} />
              </div>
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
            type="button"
            onClick={() => setOpenSubmitModal(true)}
            disabled={loadingUpdate}
            className="text-[12px] font-semibold mt-4  bg-blue-600 p-[8px] rounded cursor-pointer hover:bg-blue-500 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingUpdate ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default UpdateProfile;
