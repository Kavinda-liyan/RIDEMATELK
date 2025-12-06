import "react-image-crop/dist/ReactCrop.css";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  const hideLayout = ["/signin", "/signup"].includes(location.pathname);
  const isVehicleResult = location.pathname.startsWith(
    "/recommendation/result/vehicle/"
  );
  const hideSidenav =
    [
      "/home",
      "/recommendations",
      "/recommendations/result",
      "/recommendation/result/vehicle/:id",
      "/favourite",
    ].includes(location.pathname) || isVehicleResult;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {!hideLayout && <Navigation />}

      <div className="flex min-h-screen bg-gray-100 relative ">
        {userInfo?.isAdmin && !hideSidenav && (
          <aside
            className={`bg-rmlk-dark text-white w-[220px] overflow-hidden transition-all duration-500`}
          >
            <SideNav />
          </aside>
        )}

        <main className="flex-1 flex flex-col transition-all duration-500 ">
          <div className="flex-grow">
            <Outlet />
          </div>

          {!hideLayout && <Footer />}
        </main>
      </div>
    </>
  );
}

export default App;
