import { Link } from "react-router-dom";
import rmlk_logo from "../assets/rmlk_logo_dark.svg";

const Footer = () => {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="bg-rmlk-dark-light shadow-xl z-10 py-[24px]">
      <div className="pl-[60px] pr-[60px] max-md-rmlk:px-[24px]">
        <div className="grid grid-cols-4 py-[24px] max-xs-rmlk:grid-cols-3 max-xs-rmlk:gap-[16px]">
          <div className="col-span-1">
            <div className="py-[4px] text-white text-[14px] w-fit">
              <h4>Product</h4>
              <div className="h-[2px] w-auto bg-rmlk-red rounded-xl"></div>
            </div>

            <div className="py-[4px] text-white/80 text-[12px] flex flex-col">
              <Link to={"/aboutus"}>About Us</Link>
              <Link to={"/contactus"}>Contact Us</Link>
              <Link to={"/contactus"}>Privacy policy</Link>
            </div>
          </div>
          <div className="col-span-1">
            <div className="py-[4px] text-white text-[14px] w-fit ">
              <h4>Support</h4>
              <div className="h-[2px] w-auto bg-rmlk-red rounded-xl"></div>
            </div>
            <div className="py-[4px] text-white/80 text-[12px] flex flex-col">
              <Link to={"https://ikman.lk/en"}>ikman.lk</Link>
              <Link to={"https://riyasewana.com/"}>Riyasewana</Link>
              <Link to={"https://data.opendatasoft.com/page/home/"}>
                Opendatasoft
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <div className="py-[4px] text-white text-[14px] w-fit ">
              <h4>Follow us</h4>
              <div className="h-[2px] w-auto bg-rmlk-red rounded-xl"></div>
            </div>
            <div className="py-[4px] text-white/80 text-[12px] flex flex-col">
              <Link to={"https://ikman.lk/en"}>Facebook</Link>
              <Link to={"https://riyasewana.com/"}>Github</Link>
              <Link to={"https://data.opendatasoft.com/page/home/"}>
                LinkedIn
              </Link>
            </div>
          </div>
          <div className="col-span-1 max-xs-rmlk:hidden">
            <div className="py-[4px] ">
              <img className="h-[16px]" src={rmlk_logo}></img>
            </div>
            <div className="py-[4px] font-sans text-[12px] text-white">
              {" "}
              &copy;{year} All rights reserverd
            </div>
            <div className="py-[4px] font-sans text-[12px] text-white">
              Developed by @Kavinda_Liyanaarachchi
            </div>
          </div>
        </div>
        <div className="col-span-1 hidden max-xs-rmlk:flex flex-col items-center text-center">
          <div className="py-[4px]  ">
            <img className="h-[16px]" src={rmlk_logo}></img>
          </div>
          <div className="py-[4px] font-sans text-[12px] text-white">
            {" "}
            &copy;{year} All rights reserverd
          </div>
          <div className="py-[4px] font-sans text-[12px] text-white">
            Developed by @Kavinda_Liyanaarachchi
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
