import headerimg_2 from "../../assets/header_2.jpg";
import HeaderCard from "../../components/Assets/HeaderCard";
import bt1 from "../../assets/body_types/bt1.jpg";
import bt2 from "../../assets/body_types/bt2.jpg";
import bt3 from "../../assets/body_types/bt3.jpg";
import bt4 from "../../assets/body_types/bt4.jpg";
import bt5 from "../../assets/body_types/bt5.jpg";

import Gasoline from "../../assets/fuel_types/gasoline.jpg";
import Electric from "../../assets/fuel_types/electric.jpg";
import Hybrid from "../../assets/fuel_types/hybrid.jpg";

import Manuel from "../../assets/gear_types/Manuel.jpg";
import Auto from "../../assets/gear_types/Automatic.jpg";
import seat1 from "../../assets/seats/singleseat.jpg";
import seat2 from "../../assets/seats/2seat.jpg";
import seatM from "../../assets/seats/Manyseat.jpg";

import { useSelector } from "react-redux";

import LandingPageWrapper from "../../components/Wrappers/LandingPageWrapper";
import { motion, useScroll, useTransform } from "framer-motion";
import LogoCarousel from "../../components/LogoCarousel";

const Header_2 = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const bodyTypes = [
    { name: "Micro", img: bt1 },
    { name: "Pickup", img: bt2 },
    { name: "Roadstar", img: bt3 },
    { name: "Van", img: bt4 },
    { name: "Minivan", img: bt5 },
  ];

  const fuelTypes = [
    { name: "Gasoline", img: Gasoline },
    { name: "Hybrid", img: Hybrid },
    { name: "Electric", img: Electric },
  ];

  const gearType = [
    { name: "Manuel Transmission", img: Manuel },
    { name: "Automatic Transmission", img: Auto },
  ];

  const seats = [
    {
      name: "For Life",
      img: seat1,
    },
    {
      name: "For Travel",
      img: seat2,
    },
    {
      name: "For Travel",
      img: seatM,
    },
  ];

  const { scrollY } = useScroll();
  const imgOpacity = useTransform(scrollY, [0, 550], [0.5, 1]);

  const imgSlidetop = useTransform(scrollY, [0, 550], [200, 0]);
  const imgBlur = useTransform(scrollY, [0, 400], ["blur(2px)", "blur(0px)"]);
  const bannerImgY = useTransform(scrollY, [0, 400], [200, 0]);
  const borderY = useTransform(scrollY, [0, 400], [200, 0]);

  return (
    <LandingPageWrapper
      id={"Specifications"}
      extraClass={" pt-[60px] pb-[45px] gap-[20px] bg-rmlk-dark overflow-hidden"}
    >
      

      <div className=" flex flex-col items-center text-center justify-center mb-[20px]">
        <motion.h3
          style={{
            opacity: imgOpacity,
            filter: imgBlur,
            y: borderY,
          }}
          className="text-[28px] font-light tracking-[4px] text-white"
        >
          Discover the Drive That Defines You !
        </motion.h3>
        <motion.div
          style={{
            opacity: imgOpacity,
            y: borderY,
            filter: imgBlur,
          }}
          className="h-[4px] w-[50%] bg-rmlk-red"
        ></motion.div>
      </div>
      <div className="grid grid-cols-12 gap-[20px] px-[60px] max-sm-rmlk:px-0">
        
        <div className="col-span-6 h-full max-md-rmlk:col-span-12 ">
          
          <div className=" grid grid-rows-12 h-full gap-[20px]">
            <div className="row-span-6 h-full">
              <div className=" grid grid-cols-12 gap-[20px] h-full">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    y: imgSlidetop,
                    opacity: imgOpacity,
                    filter: imgBlur,
                    scale: imgOpacity,
                  }}
                  className="col-span-6"
                >
                  <HeaderCard
                    items={bodyTypes}
                    description={"Shape that defines your drive."}
                    duration={0.8}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    y: imgSlidetop,
                    opacity: imgOpacity,
                    filter: imgBlur,
                    scale: imgOpacity,
                  }}
                  className="col-span-6"
                >
                  <HeaderCard
                    description={"Power your journey, your way."}
                    items={fuelTypes}
                    duration={0.8}
                  />
                </motion.div>
              </div>
            </div>

            <div className="row-span-6">
              <div className=" grid grid-cols-12 gap-[20px] h-full">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    y: imgSlidetop,
                    opacity: imgOpacity,
                    filter: imgBlur,
                    scale: imgOpacity,
                  }}
                  className="col-span-6 h-full"
                >
                  <HeaderCard
                    description={"Precision in every shift."}
                    items={gearType}
                    duration={0.8}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    y: imgSlidetop,
                    opacity: imgOpacity,
                    filter: imgBlur,
                    scale: imgOpacity,
                  }}
                  className="col-span-6"
                >
                  <HeaderCard
                    description={"Room for every story."}
                    items={seats}
                    duration={0.8}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          style={{
            y: imgSlidetop,
            filter: imgBlur,
            scale: imgOpacity,
          }}
          className="h-full overflow-hidden col-span-6 relative rounded-sm shadow-md max-md-rmlk:col-span-12 "
        >
          <motion.img
            className={`object-cover w-full ${
              userInfo && userInfo.isAdmin ? "scale-150" : "scale-150"
            }   absolute left-[70px]`}
            src={headerimg_2}
            alt="header_img_2"
          />
        </motion.div>
      </div>
      
    </LandingPageWrapper>
  );
};

export default Header_2;
