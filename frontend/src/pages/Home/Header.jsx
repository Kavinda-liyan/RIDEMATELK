import { Link, useLocation } from "react-router-dom";
import rmlk_l_dark from "../../assets/rmlk_logo_dark.svg";
import bg_Clip from "../../assets/BgClip.mp4";
import { useEffect, useRef } from "react";
import rmlk_bg from "../../assets/Bg_dark.jpg";
import LandingPageWrapper from "../../components/Wrappers/LandingPageWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";

const Header = () => {
  const videoRef = useRef(null);
  const forwardRef = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play();

    const interval = setInterval(() => {
      if (forwardRef.current) {
        if (video.currentTime >= video.duration) {
          forwardRef.current = false;
        }
      } else {
        if (video.currentTime <= 0) {
          forwardRef.current = true;
        } else {
          video.currentTime -= 0.03; // step for reverse
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <LandingPageWrapper id={"Home"} extraClass={"Header overflow-hidden"}>
      <div id="bgImage">
        {/* <video
          ref={videoRef}
          src={bg_Clip}
          muted
          className="w-full h-full object-[20%_30%] object-cover absolute top-0 left-0 z-0 brightness-100"
          /> */}
        <motion.img
          initial={{ scale: 1.8, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={rmlk_bg}
          alt="background_image"
          className="w-full h-full  object-[20%_30%] object-cover absolute top-0 left-0 z-0 brightness-100 max-sm-rmlk:object-[50%_30%] max-md-rmlk:brightness-75"
        />
      </div>
      <div className="h-auto pt-[50px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-60%]">
        <div className="w-[640px] flex items-center justify-center flex-col gap-[8px] p-[16px] max-xs-rmlk:w-[300px]">
          <motion.img
            initial={{ scale: 1, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            src={rmlk_l_dark}
            alt="ridemelk_logo_dark"
            className="w-[480px] max-sm-rmlk:w-[300px]"
            id="rmlk_logo"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            className="w-[480px] max-xs-rmlk:w-[300px] p-[16px] "
          >
            <h3 className="text-white text-center text-[16px] tracking-wider font-light max-xs-rmlk:text-[14px]">
              Sri Lanka’s leading vehicle recommendation system, empowering
              drivers to discover the perfect ride through intelligent insights
              and data-driven suggestions.
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            className="flex justify-center items-center flex-col gap-[5px]"
          >
            <Link
              to={"/recommendations"}
              className="group font-rmlk-secondary relative overflow-hidden flex items-center justify-center text-[14px] px-[8px] py-[4px] border-[1px] rounded-sm shadow-md text-white bg-rmlk-dark/20 backdrop-blur-xs hover:text-white/90 hover:shadow-md duration-200 hover:backdrop-blur-lg w-[190px]"
            >
              <span className="transition-all duration-300 group-hover:translate-y-[-100%] group-hover:opacity-0">
                Discover Your Ideal Ride !
              </span>
              <span className="absolute translate-y-[100%] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </LandingPageWrapper>
  );
};

export default Header;
