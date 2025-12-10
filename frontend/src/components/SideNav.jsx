import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLinks from "./Assets/NavLinks";
import { useState, useEffect } from "react";
import {
  faBars,
  faCarSide,
  faDashboard,
  faHomeAlt,
  faStar,
  faUsers,
  faCaretRight,
  faUserAltSlash,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import imgPlaceholder from "../assets/placeholderimg.svg";

const SideNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed  z-50 mt-[50px] bg-rmlk-dark-light">
      {/* SIDEBAR MAIN WRAPPER */}
      <div
        className={`h-[100dvh] bg-rmlk-dark duration-300 
          w-[300px]
        `}
      >
        <div className="h-full pt-[8px] flex flex-col gap-[20px] pl-[60px] pr-[20px] ">
          <div className="font-rmlk-secondary p-[8px] rounded-sm bg-rmlk-dark-light shadow-md">
            <h3 className="p-[4px] text-[18px] font-semibold text-center mb-[8px]">
              Admin Panel
            </h3>
            <div className="flex items-center flex-col">
              <div className="rounded-full border-2 border-rmlk-red overflow-hidden w-[80px] h-[80px]">
                <img
                  src={
                    userInfo.profilePicture
                      ? userInfo.profilePicture
                      : imgPlaceholder
                  }
                  alt="Profile"
                  className=" rounded-full object-cover "
                />
              </div>
              <h2 className="p-[4px] text-[12px]">
                {" "}
                <FontAwesomeIcon
                  icon={faUserLock}
                  className="text-[12px] mr-[2px]"
                />
                {userInfo.username}
              </h2>
            </div>
          </div>

          <div className="p-[8px] rounded-sm  bg-rmlk-dark-light shadow-md">
            <ul
              className={`text-[12px] flex flex-col gap-[24px]  py-[16px] text-white transition-all duration-300
            
          `}
            >
              <NavLinks path="/admin/dashboard" navlink="Dashboard">
                <FontAwesomeIcon className="pr-2" icon={faDashboard} />
              </NavLinks>

              <NavLinks path="/home" navlink="Home">
                <FontAwesomeIcon className="pr-2" icon={faHomeAlt} />
              </NavLinks>

              <NavLinks path="/admin/allvehicles" navlink="All Vehicles">
                <FontAwesomeIcon className="pr-2" icon={faCarSide} />
              </NavLinks>

              <NavLinks path="/admin/allusers" navlink="All Users">
                <FontAwesomeIcon className="pr-2" icon={faUsers} />
              </NavLinks>

              <NavLinks path="/admin/reviews" navlink="Reviews">
                <FontAwesomeIcon className="pr-2" icon={faStar} />
              </NavLinks>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
