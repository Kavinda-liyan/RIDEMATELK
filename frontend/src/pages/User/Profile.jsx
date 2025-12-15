import { useSelector } from "react-redux";
import imgPlaceholder from "../../assets/userPlaceholder.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("User Info:", userInfo);

  return (
    <section className="h-dvh bg-rmlk-dark pl-[60px] pr-[60px] pt-[50px] font-rmlk-secondary max-sm-rmlk:px-[24px]">
      <div className="h-full w-full flex flex-col items-center justify-center text-white gap-8">
        <div></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-[50%] flex items-center justify-center flex-col gap-[16px] bg-rmlk-dark-light p-[32px] rounded-sm shadow-md max-sm-rmlk:w-full"
        >
          <div className="w-[120px] h-[120px] overflow-hidden rounded-full border-2 border-rmlk-dark-lighter shadow-md cursor-pointer">
            <img
              src={
                userInfo.profilePicture
                  ? userInfo.profilePicture
                  : imgPlaceholder
              }
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="text-[18px]">{userInfo.username.toUpperCase()}</h3>
          <div className="mt-[16px]">
            <table className="table-auto w-full text-left">
              <tbody>
                <tr className="py-2">
                  <td className="p-2 font-rmlk-secondary font-semibold">
                    User Name{" "}
                  </td>
                  <td className=" p-2 font-rmlk-secondary">
                    : {userInfo.username}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-rmlk-secondary font-semibold">
                    Email{" "}
                  </td>
                  <td className=" p-2 font-rmlk-secondary">
                    : {userInfo.email}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-rmlk-secondary font-semibold">
                    Profile
                  </td>
                  <td className=" p-2 font-rmlk-secondary">
                    : {userInfo.isAdmin ? "Admin" : "User"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            onClick={() => navigate("/profile/update")}
            className="text-[12px] font-semibold bg-rmlk-red hover:bg-rmlk-red-light w-full p-[8px] font-rmlk-secondary rounded-sm shadow-md cursor-pointer duration-200"
          >
            Update Profile
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
