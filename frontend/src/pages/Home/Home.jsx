import { useSelector } from "react-redux";
import AdminDashboardButton from "../../components/Assets/AdminDashboardButton.jsx";
import HomeNavigation from "../../components/HomeNavigation.jsx";
import Header from "./Header.jsx";
import Header_2 from "./Header_2.jsx";
import { motion } from "framer-motion";
import LogoCarousel from "../../components/LogoCarousel.jsx";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <section className="overflow-x-hidden">
      <HomeNavigation />
      {userInfo && userInfo.isAdmin && <AdminDashboardButton />}

      <Header />
      <LogoCarousel />
      <Header_2 />
    </section>
  );
};

export default Home;
