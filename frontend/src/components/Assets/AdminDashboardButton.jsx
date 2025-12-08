import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboardButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-[80px] left-[60px] text-white font-rmlk-secondary text-[14px] z-50"
    >
      <Link
        to={"/admin/dashboard"}
        className="px-[16px] py-[12px] border-[1.5px] border-rmlk-dark-lighter bg-rmlk-dark-lighter/30 backdrop-blur-md rounded-sm shadow-md cursor-pointer hover:bg-rmlk-dark-lighter/50 duration-200"
      >
        <FontAwesomeIcon icon={faBars} /> Admin Dashboard
      </Link>
    </motion.div>
  );
};

export default AdminDashboardButton;
