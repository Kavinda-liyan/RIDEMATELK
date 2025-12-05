import { Link } from "react-router-dom";
import rmlk_l_dark from "../../assets/rmlk_logo_dark.svg";

const Header = () => {
  return (
    <section
      className={` Header h-dvh bg-rmlk-dark_green pl-[60px] pr-[60px] relative`}
      id="Home"
    >
      <div className="h-auto pt-[50px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-60%]">
        <div className="w-[640px] flex items-center justify-center flex-col gap-[8px] p-[16px] ">
          <img
            src={rmlk_l_dark}
            alt="ridemelk_logo_dark"
            className="w-[480px]"
          ></img>
          <div className="w-[480]">
            <h3 className="text-white text-center text-[16px] tracking-wider font-light">
              Sri Lanka’s leading vehicle recommendation system, empowering
              drivers to discover the perfect ride through intelligent insights
              and data-driven suggestions.
            </h3>
          </div>
          <div className="flex justify-center items-center flex-col gap-[5px]">
            <p className="text-white text-center text-[12px] tracking-wider font-light">
              Discover Your Ideal Ride{" "}
            </p>
            <Link
              to={"/recommendations"}
              className=" font-rmlk-secondary flex items-center justify-center text-[16px] px-[8px] py-[4px] border-[1.5px] rounded-xs shadow-md text-white bg-rmlk-dark_green/20 backdrop-blur-xs hover:text-white/90 hover:shadow-sm hover:shadow-rmlk-red/20 duration-200 "
            >
              Start Now !
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
