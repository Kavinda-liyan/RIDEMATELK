import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLinks from "./Assets/NavLinks";
import { useState, useEffect } from "react";
import {
  faBars,
  faCaretLeft,
  faCaretRight,
  faCarSide,
  faDashboard,
  faHomeAlt,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const handleSidenav = () => {
    setIsSidenavOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav>
      <div className={`h-[calc(100vh-45px)] mt-[45px] w-[180px] fixed z-30  `}>
        <div className="  relative top-2 pl-[60px] text-[12px]">
          <button
            onClick={handleSidenav}
            className="group hover:cursor-pointer flex items-center gap-2 bg-rmlk-dark-light border-[1.5px] border-rmlk-dark-lighter text-white w-[40px] hover:w-[140px] px-[8px] py-[4px] rounded-md shadow-md overflow-hidden duration-300 hover:bg-rmlk-dark-lighter/80"
          >
            <FontAwesomeIcon icon={faBars} className="min-w-[20px]" />
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-5 duration-300 whitespace-nowrap">
              Admin Panel
              <FontAwesomeIcon icon={faCaretRight} />
            </span>
          </button>
        </div>
        <div
          className={`relative top-[-34px] h-full ${
            isSidenavOpen ? "left-[0px] opacity-100" : "left-[-200px] opacity-0"
          } duration-300 transition-all ease-in-out`}
        >
          <div className="flex  justify-start  h-full bg-rmlk-dark-light ">
            <ul className="text-[12px] flex flex-col gap-[16px] pl-[24px] py-[8px] w-full text-white">
              <li
                onClick={() => handleSidenav()}
                className=" text-white px-[4px] py-[4px]  rounded-md  duration-200 hover:cursor-pointer group"
              >
                <FontAwesomeIcon className="pr-[4px]" icon={faBars} /> Admin
                Panel
                
              </li>

              <NavLinks path={"/admin/dashboard"} navlink={"Dashboard"}>
                <FontAwesomeIcon className="pr-[4px]" icon={faDashboard} />{" "}
              </NavLinks>
              <NavLinks path={"/home"} navlink={"Home"}>
                <FontAwesomeIcon className="pr-[4px]" icon={faHomeAlt} />{" "}
              </NavLinks>
              <NavLinks path={"/admin/allvehicles"} navlink={"All Vehicles"}>
                <FontAwesomeIcon className="pr-[4px]" icon={faCarSide} />{" "}
              </NavLinks>
              <NavLinks path={""} navlink={"All Users"}>
                <FontAwesomeIcon className="pr-[4px]" icon={faUsers} />{" "}
              </NavLinks>
              <NavLinks path={""} navlink={"Reviews"}>
                <FontAwesomeIcon className="pr-[4px]" icon={faStar} />{" "}
              </NavLinks>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
