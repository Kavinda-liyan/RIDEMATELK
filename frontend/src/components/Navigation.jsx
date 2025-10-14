import { Link, useLocation } from "react-router-dom";
import NavLinks from "./Assets/NavLinks";
import rmlk_logo_dark from '../assets/rmlk_logo_dark.svg'

const Navigation = () => {
  const location = useLocation();
  return (
    <>
      <nav className=" w-full h-[45px]  fixed bg-gradient-to-b from-rmlk-dark/100 to-rmlk-dark/0">
        <div className="pl-[60px] pr-[60px] py-[8px] h-full grid grid-cols-12">
          <div className="col-span-2 flex justify-start">
            <div className="font-rmlk-secondary font-bold tracking-wider text-white flex items-center justify-center ">
              <img className="h-[16px]" src={rmlk_logo_dark} alt="logo"/>
            </div>
          </div>
          <div className="col-span-8 flex justify-center items-center">
            <ul className="navs flex gap-[32px] text-[12px] font-light">
              <NavLinks path={"/"} navlink={"Home"} />
              <NavLinks path={"/recommendations"} navlink={"Recommendations"} />
              <NavLinks path={""} navlink={"About Us"} />
              <NavLinks path={""} navlink={"Contact Us"} />
            </ul>
          </div>
          <div className="col-span-2 flex justify-end"></div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
