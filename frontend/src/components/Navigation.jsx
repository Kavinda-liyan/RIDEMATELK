import { Link, useLocation } from "react-router-dom";
import NavLinks from "./Assets/NavLinks";
import rmlk_logo_dark from "../assets/rmlk_logo_dark.svg";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", link_des: "Home" },
    { path: "/recommendations", link_des: "Recommendations" },
    { path: "/about", link_des: "About Us" },
    { path: "/contact", link_des: "Contact Us" },
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
              <Link to={"/signin"} className="h-full hover:cursor-pointer text-white font-light text-[12px] px-[16px] py-[6px] border-[1.5px] rounded-full hover:text-white/50 duration-200">
                <FontAwesomeIcon icon={faUserAlt} /> Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
