import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLinks from "./Assets/NavLinks";
import rmlk_logo_dark from "../assets/rmlk_logo_dark.svg";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faSignIn,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice.js";
import { useLogoutMutation } from "../app/api/usersApiSlice.js";
import imgPlaceholder from "../assets/placeholderimg.svg";
import HamburgerButton from "./Assets/HamburgerButton.jsx";
import CloseButton from "./Assets/CloseButton.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [mobileDropdownOpen, setMobileDropDownOpen] = useState(false);

  const [LogoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await LogoutApi().unwrap();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (mobileDropdownOpen) {
      // Disable page scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup when component unmounts
    };
  }, [mobileDropdownOpen]);

  const navLinks = [
    { path: "/" || "/home", link_des: "Home" },
    { path: "/recommendations", link_des: "Recommendations" },
    { path: "/about", link_des: "About Us" },
    { path: "/contact", link_des: "Contact Us" },
  ];

  const userLinks = [
    { path: "/profile", link_des: "Profile" },
    { path: "/favourite", link_des: "Favourite" },
  ];

  const DesktopNavLinks = (
    <div className="flex justify-center items-center max-md-rmlk:hidden">
      <ul className="navs flex gap-[32px] text-[12px] font-light">
        {navLinks.map(({ path, link_des }, index) => (
          <NavLinks key={index} path={path} navlink={link_des} />
        ))}
      </ul>
    </div>
  );

  const MobileNavLinks = (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-0 left-0 w-full h-[100dvh] bg-rmlk-dark py-[20px]  z-20"
    >
      <div className="flex justify-end px-[16px]">
        <CloseButton handleClick={() => setMobileDropDownOpen(false)} />
      </div>

      <div className="h-full w-full flex items-center justify-center">
        <ul className="flex flex-col gap-[40px] text-[18px] font-light text-white px-[32px] items-center">
          {navLinks.map(({ path, link_des }, index) => (
            <NavLinks
              key={index}
              path={path}
              navlink={link_des}
              handleClose={() => setMobileDropDownOpen(false)}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  );

  const userNames = userInfo ? userInfo.username : "";
  const userNameArr = userNames.split(" ");
  return (
    <>
      <nav
        className={`w-full fixed h-[50px] bg-gradient-to-b transition-all  z-10 bg-rmlk-dark/40 duration-300 shadow-md backdrop-blur-md`}
      >
        <div className="px-[60px] max-md-rmlk:px-[24px] py-[8px] h-full flex justify-between items-center">
          <div className=" flex justify-start">
            <div className="font-rmlk-secondary font-bold tracking-wider text-white flex items-center justify-center ">
              <Link to={"/home"}>
                <img className="h-[12px]" src={rmlk_logo_dark} alt="logo" />
              </Link>
            </div>
          </div>
          {DesktopNavLinks}
          <AnimatePresence>
            {mobileDropdownOpen && MobileNavLinks}
          </AnimatePresence>

          <div className=" flex justify-end items-center">
            <div className="">
              {userInfo ? (
                <>
                  <div>
                    <button
                      onClick={handleDropdown}
                      className="text-white text-[12px] hover:cursor-pointer hover:text-rmlk-red duration-200 flex items-center group "
                    >
                      <img
                        className="object-cover h-[30px] w-[30px] rounded-full mr-[8px] border-rmlk-dark-lighter border-[1.5px] group-hover:border-rmlk-red duration-200"
                        src={
                          userInfo?.profilePicture
                            ? userInfo.profilePicture
                            : imgPlaceholder
                        }
                      />
                      {userNameArr[0]} {userNameArr[userNameArr.length - 1]}{" "}
                      <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to={"/signin"}
                  className="flex items-center gap-[8px] h-full hover:cursor-pointer bg-rmlk-dark/50 backdrop-blur-md text-white bg-iv text-[12px] px-[8px] py-[4px] border-[1px] rounded-full shadow-md hover:bg-rmlk-dark/80  duration-200 font-rmlk-secondary font-semibold"
                >
                  <FontAwesomeIcon icon={faSignIn} /> Sign In
                </Link>
              )}
            </div>
            <div className="ml-[16px] max-2xl-rmlk:hidden max-md-rmlk:block">
              <HamburgerButton
                handleClick={() => setMobileDropDownOpen((currunt) => !currunt)}
              />
            </div>
          </div>
        </div>
        <div
          ref={dropdownRef}
          className={`${
            isDropdownOpen ? "" : "hidden"
          } absolute top-[50px] right-[65px] bg-rmlk-dark-light  rounded-sm shadow-md overflow-hidden border-[1.5px] border-rmlk-dark-lighter font-rmlk-secondary text-[12px]
           `}
        >
          <ul className=" text-[14px] text-white">
            {userLinks.map(({ path, link_des }, index) => (
              <li key={index}>
                <Link
                  className=" text-left px-[24px] py-[10px] hover:cursor-pointer hover:bg-rmlk-dark-lighter duration-200 w-full block font-rmlk-secondary"
                  to={path}
                  onClick={handleLinkClick}
                >
                  {link_des}
                </Link>
              </li>
            ))}

            <li>
              <button
                className="px-[24px] py-[10px] hover:cursor-pointer hover:bg-rmlk-dark-lighter duration-200 w-full text-left"
                onClick={() => {
                  handleLogout();
                  handleLinkClick();
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
