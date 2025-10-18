import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLinks from "./Assets/NavLinks";
import rmlk_logo_dark from "../assets/rmlk_logo_dark.svg";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice.js";
import { useLogoutMutation } from "../app/api/usersApiSlice.js";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [LogoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { path: "/profile", user_link_des: "Profile" },
    { path: "/favourite", link_des: "Favourite" },
  ];
  return (
    <>
      <nav
        className={`w-full h-[45px]  fixed bg-gradient-to-b transition-all duration-300 z-10 ${
          isScrolled
            ? "bg-rmlk-dark duration-300"
            : "from-rmlk-dark/100 to-rmlk-dark/0 duration-300"
        }`}
      >
        <div className="pl-[60px] pr-[60px] py-[8px] h-full grid grid-cols-12">
          <div className="col-span-2 flex justify-start">
            <div className="font-rmlk-secondary font-bold tracking-wider text-white flex items-center justify-center ">
              <img className="h-[12px]" src={rmlk_logo_dark} alt="logo" />
            </div>
          </div>
          <div className="col-span-8 flex justify-center items-center">
            <ul className="navs flex gap-[32px] text-[12px] font-light">
              {navLinks.map(({ path, link_des }) => (
                <NavLinks key={path} path={path} navlink={link_des} />
              ))}
            </ul>
          </div>
          <div className="col-span-2 flex justify-end items-center">
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
                  className="h-full hover:cursor-pointer text-white font-light text-[12px] px-[16px] py-[6px] border-[1.5px] rounded-full hover:text-white/50 duration-200"
                >
                  <FontAwesomeIcon icon={faUserAlt} /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            isDropdownOpen ? "" : "hidden"
          } absolute top-[40px] right-[65px] bg-rmlk-dark-lighter  rounded-md shadow-md overflow-hidden border-[1.5px] border-rmlk-dark-lighter`}
        >
          <ul className=" text-[16px] text-white">
            {userLinks.map(({ path, link_des }) => (
              <li>
                <Link
                  className=" px-[18px] py-[10px] hover:cursor-pointer hover:bg-rmlk-dark-light duration-200 w-full block"
                  key={path}
                  to={path}
                  onClick={handleLinkClick}
                >
                  {link_des}
                </Link>
              </li>
            ))}

            <li>
              <button
                className="px-[18px] py-[10px] hover:cursor-pointer hover:bg-rmlk-dark-light duration-200 w-full"
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
