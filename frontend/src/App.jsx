import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Navigation />
      {userInfo && userInfo.isAdmin && <SideNav />}

      <Outlet />
      <Footer />
    </>
  );
}

export default App;
