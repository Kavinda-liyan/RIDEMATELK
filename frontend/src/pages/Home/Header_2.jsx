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

const Header_2 = () => {
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
  return (
    <section className="h-dvh bg-rmlk-dark grid grid-cols-12 pl-[60px] pr-[60px] pt-[45px] pb-[45px] gap-[20px]" id="Specifications">
      <div className="col-span-6 h-full">
        <div className=" grid grid-rows-12 h-full gap-[20px]">
          <div className="row-span-5 h-full">
            <div className=" grid grid-cols-12 gap-[20px] h-full">
              <div className="col-span-6">
                <HeaderCard
                  items={bodyTypes}
                  description={"Shape that defines your drive."}
                  duration={0.8}
                />
              </div>
              <div className="col-span-6">
                <HeaderCard
                  description={"Power your journey, your way."}
                  items={fuelTypes}
                  duration={0.8}
                />
              </div>
            </div>
          </div>
          <div className="row-span-2 flex items-center text-center justify-center">
            <h3 className="text-[24px] font-light tracking-[4px] text-white">
              Discover the Drive That Defines You !
            </h3>
          </div>
          <div className="row-span-5">
            <div className=" grid grid-cols-12 gap-[20px] h-full">
              <div className="col-span-6 h-full">
                <HeaderCard
                  description={"Precision in every shift."}
                  items={gearType}
                  duration={0.8}
                />
              </div>
              <div className="col-span-6">
                <HeaderCard
                  description={"Room for every story."}
                  items={seats}
                  duration={0.8}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full overflow-hidden col-span-6 relative rounded-md shadow-md">
        <img
          className="object-cover w-full scale-200  absolute left-[70px]"
          src={headerimg_2}
          alt="header_img_2"
        />
      </div>
    </section>
  );
};

export default Header_2;
