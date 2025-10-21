const LinkTree = ({ children }) => {
  return (
    <>
      <div className="py-[8px] text-white font-rmlk-secondary text-[14px] flex items-center">
        <p className="">Admin</p> <span className="px-[4px]">/</span>
        {children}
      </div>
    </>
  );
};

export default LinkTree;
