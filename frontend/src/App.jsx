import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Navigation />

      <div className="flex min-h-screen bg-gray-100 relative">
        {userInfo && userInfo.isAdmin && (
          <aside
            className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-800 text-white 
            w-[200px]
            `}
          >
            <SideNav />
          </aside>
        )}

        {/* Main content */}
        <main
          className={`flex-1 flex flex-col transition-all duration-500 `}
        >
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
