const InputWrapper = ({ children, title }) => {
  return (
    <>
      <div className=" p-[8px]">
        <h4 className="py-[8px] text-white/40 text-[14px]">{title}</h4>
        <div className="flex w-full flex-row border border-rmlk-dark-lighter rounded-md">
          {children}
        </div>
      </div>
    </>
  );
};

export default InputWrapper;
