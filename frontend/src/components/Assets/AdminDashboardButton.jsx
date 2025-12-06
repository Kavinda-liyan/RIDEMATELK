import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const AdminDashboardButton = () => {
  return (
    <div className="fixed top-[80px] left-[60px] text-white font-rmlk-secondary text-[14px] z-50">
      <Link
        to={"/admin/dashboard"}
        className="px-[16px] py-[12px] border-[1.5px] border-rmlk-dark-lighter bg-rmlk-dark-lighter/30 backdrop-blur-md rounded-sm shadow-md cursor-pointer hover:bg-rmlk-dark-lighter/50 duration-200"
      >
        <FontAwesomeIcon icon={faBars} /> Admin Dashboard
      </Link>
    </div>
  );
};

export default AdminDashboardButton;
