import { useSelector } from "react-redux";
import AdminDashboardButton from "../../components/Assets/AdminDashboardButton.jsx";
import HomeNavigation from "../../components/HomeNavigation.jsx";
import Header from "./Header.jsx";
import Header_2 from "./Header_2.jsx";
import { motion } from "framer-motion";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <HomeNavigation />
      {userInfo && userInfo.isAdmin && <AdminDashboardButton />}

      <Header />
      <Header_2 />
    </>
  );
};

export default Home;
