import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VehicleCard = ({
  imgPlaceholder,
  Model,
  Manufacturer,
  bodytype,
  fueltype,
  fuelEff,
  groundC,
  seats,
  openVehicleFunc,
}) => {
  return (
    <div className="py-[16px] px-[18px] ">
      <div
        onClick={openVehicleFunc}
        id="card"
        className="relative hover:scale-105 duration-200 w-full bg-rmlk-dark-light rounded-xs shadow-md border border-rmlk-dark-light overflow-hidden min-h-[290px]"
      >
        <button className="z-[1] w-[25px] h-[25px] cursor-pointer bg-rmlk-dark-lighter absolute flex items-center justify-center rounded-full shadow-md top-[8px] right-[8px] text-white hover:bg-rmlk-red-light duration-200">
          <FontAwesomeIcon icon={faHeart} className="text-[12px]" />
        </button>

        <div className="h-[150px] w-full relative">
          <img
            src={imgPlaceholder}
            alt={imgPlaceholder}
            className="h-full w-full object-cover "
          />
          <h3 className="absolute text-left text-[12px]  text-white font-semibold font-rmlk-secondary line-clamp-2 bg-rmlk-dark/60 w-full bottom-0 p-[8px]">
            {Model}
          </h3>
        </div>
        <div className="p-[16px]">
          <h4 className="text-left text-[12px] text-amber-400 font-rmlk-secondary mb-[4px]">
            <strong>Manufacturer</strong> : {Manufacturer}
          </h4>

          <div className="text-left text-[12px] font-rmlk-secondary text-white">
            <p className="w-fit mb-[2px]">
              <strong>Body Type</strong> : {bodytype}
            </p>
            <p className="w-fit mb-[2px]">
              <strong>Fuel Type</strong> : {fueltype}
            </p>
            <p className="w-fit mb-[2px]">
              <strong>Fuel Efficiency</strong> : {fuelEff}
            </p>
            <p className="w-fit mb-[2px]">
              <strong>Ground Clearance</strong> : {groundC} mm
            </p>
            <p className="w-fit mb-[2px]">
              <strong>Seating Capacity</strong> : {seats}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
