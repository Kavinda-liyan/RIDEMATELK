const CloseButton = ({handleClick}) => {
  return (
    <>
      <button
        className="flex text-white duration-200 transition-all w-[30px] cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col gap-[6px] justify-start items-center group">
          <span className="relative left-0 top-2 w-[26px] -rotate-45 h-[2.5px] rounded-full bg-white group-hover:w-[26px]  transition-all duration-300"></span>
          <span className=" relative left-0 w-[26px] rotate-45 h-[3px] rounded-full bg-white group-hover:w-[26px]  transition-all duration-300 "></span>
        </div>
        
      </button>
    </>
  );
};

export default CloseButton;
