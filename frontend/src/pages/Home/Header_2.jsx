import headerimg_2 from "../../assets/header_2.jpg";
import HeaderCard from "../../components/Assets/HeaderCard";
import Micro from "../../assets/body_types/Micro.svg";
import Pickup from "../../assets/body_types/Pickup 1.svg";
import Roadstar from "../../assets/body_types/Roadstar 1.svg";
import Van from "../../assets/body_types/Van 1.svg";
import Coupe from "../../assets/body_types/Coupe 1.svg";
import Hatchback from "../../assets/body_types/Hatchback 1.svg";
import Sedan from "../../assets/body_types/Sedan 1.svg";
import Minivan from "../../assets/body_types/Minivan 1.svg";

import Gasoline from "../../assets/fuel_types/Petrol.svg";
import Electric from "../../assets/fuel_types/Electric.svg";
import Hybrid from "../../assets/fuel_types/Hybrid.svg";

import Manuel from "../../assets/gear_types/Gear Box_Manuel.svg";
import Auto from "../../assets/gear_types/Gear Box_Auto.svg";

import seat2 from "../../assets/seats/seat2.svg";
import seat4 from "../../assets/seats/seat4.svg";

import { useSelector } from "react-redux";

import LandingPageWrapper from "../../components/Wrappers/LandingPageWrapper";
import { motion, useScroll, useTransform } from "framer-motion";

const Header_2 = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const bodyTypes = [
    { name: "Micro", img: Micro },
    { name: "Pickup", img: Pickup },
    { name: "Roadstar", img: Roadstar },
    { name: "Van", img: Van },
    { name: "Minivan", img: Minivan },
    { name: "Sedan", img: Sedan },
    { name: "Hatchback", img: Hatchback },
    { name: "Coupe", img: Coupe },
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
      img: seat2,
    },
    {
      name: "For Travel",
      img: seat4,
    },
  ];

  const { scrollY } = useScroll();
  const imgOpacity = useTransform(scrollY, [0, 400], [0, 1]);
  const imgSlideleft = useTransform(scrollY, [0, 400], [-80, 0]);
  const imgSlideright = useTransform(scrollY, [0, 400], [80, 0]);
  const imgBlur = useTransform(scrollY, [0, 500], ["blur(2px)", "blur(0px)"]);
  const bannerImgY = useTransform(scrollY, [0, 700], [50, 0]);

  return (
    <LandingPageWrapper
      id={"Specifications"}
      extraClass={
        "grid grid-cols-12 pt-[60px] pb-[45px] gap-[20px] bg-rmlk-dark"
      }
    >
      <div className="col-span-6 h-full max-md-rmlk:col-span-12 ">
        <div className=" grid grid-rows-12 h-full gap-[20px]">
          <div className="row-span-5 h-full">
            <div className=" grid grid-cols-12 gap-[20px] h-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  x: imgSlideleft,
                  opacity: imgOpacity,
                  filter: imgBlur,
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
                  x: imgSlideright,
                  opacity: imgOpacity,
                  filter: imgBlur,
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
          <div className="row-span-2 flex items-center text-center justify-center">
            <motion.h3
              style={{
                opacity: imgOpacity,
                filter: imgBlur,
              }}
              className="text-[24px] font-light tracking-[4px] text-white"
            >
              Discover the Drive That Defines You !
            </motion.h3>
          </div>
          <div className="row-span-5">
            <div className=" grid grid-cols-12 gap-[20px] h-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  x: imgSlideleft,
                  opacity: imgOpacity,
                  filter: imgBlur,
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
                  x: imgSlideright,
                  opacity: imgOpacity,
                  filter: imgBlur,
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
          x: bannerImgY,
          filter: imgBlur,
        }}
        className="h-full overflow-hidden col-span-6 relative rounded-xs shadow-md max-md-rmlk:col-span-12 "
      >
        <motion.img
          style={{
            x: bannerImgY,
            filter: imgBlur,
          }}
          className={`object-cover w-full ${
            userInfo && userInfo.isAdmin ? "scale-[200%]" : "scale-200"
          }   absolute left-[70px]`}
          src={headerimg_2}
          alt="header_img_2"
        />
      </motion.div>
    </LandingPageWrapper>
  );
};

export default Header_2;
