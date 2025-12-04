import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLinks from "./Assets/NavLinks";
import rmlk_logo_dark from "../assets/rmlk_logo_dark.svg";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice.js";
import { useLogoutMutation } from "../app/api/usersApiSlice.js";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const navLinks = [
    { path: "/home", link_des: "Home" },
    { path: "/recommendations", link_des: "Recommendations" },
    { path: "/about", link_des: "About Us" },
    { path: "/contact", link_des: "Contact Us" },
  ];

  const userLinks = [
    { path: "/profile", link_des: "Profile" },
    { path: "/favourite", link_des: "Favourite" },
  ];
  return (
    <>
      <nav
        className={`w-full fixed h-[50px] bg-gradient-to-b transition-all  z-10 bg-rmlk-dark/40 duration-300 shadow-md backdrop-blur-md`}
      >
        <div className="pl-[60px] pr-[60px] py-[8px] h-full flex justify-between items-center">
          <div className=" flex justify-start">
            <div className="font-rmlk-secondary font-bold tracking-wider text-white flex items-center justify-center ">
              <Link to={"/home"}>
                <img className="h-[12px]" src={rmlk_logo_dark} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <ul className="navs flex gap-[32px] text-[12px] font-light">
              {navLinks.map(({ path, link_des }, index) => (
                <NavLinks key={index} path={path} navlink={link_des} />
              ))}
            </ul>
          </div>
          <div className=" flex justify-end items-center">
            <div className="">
              {userInfo ? (
                <>
                  <div>
                    <button
                      onClick={handleDropdown}
                      className="text-white text-[12px] hover:cursor-pointer hover:text-white/50 duration-200 "
                    >
                      {userInfo.username} <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to={"/signin"}
                  className="h-full hover:cursor-pointer bg-white text-rmlk-dark bg-iv text-[12px] px-[16px] py-[8px] border-[1.5px] rounded-sm shadow-md hover:bg-white/80  duration-200 font-rmlk-secondary font-semibold"
                >
                  <FontAwesomeIcon icon={faUserAlt} /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
        <div
          ref={dropdownRef}
          className={`${
            isDropdownOpen ? "" : "hidden"
          } absolute top-[40px] right-[65px] bg-rmlk-dark-light  rounded-sm shadow-md overflow-hidden border-[1.5px] border-rmlk-dark-lighter font-rmlk-secondary text-[12px]
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
