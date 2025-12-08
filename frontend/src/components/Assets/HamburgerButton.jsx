import React from "react";

const HamburgerButton = ({ handleClick, btnText, btnTxtStyle }) => {
  return (
    <>
      <button
        className="flex text-white duration-200 transition-all w-[30px] cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col gap-[6px] justify-start items-center group">
          <span className="w-[26px] h-[2.5px] rounded-full bg-white group-hover:w-[20px]  transition-all duration-300"></span>
          <span className="w-[20px] h-[3px] rounded-full bg-white group-hover:w-[26px]  transition-all duration-300 "></span>
          <span className="w-[26px] h-[2.5px] rounded-full bg-white group-hover:w-[20px]  transition-all duration-300"></span>
        </div>
        <span className={btnTxtStyle}>{btnText}</span>
      </button>
    </>
  );
};

export default HamburgerButton;
