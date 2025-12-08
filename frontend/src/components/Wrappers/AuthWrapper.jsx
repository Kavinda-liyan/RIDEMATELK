const AuthWrapper = ({ children }) => {
  return (
    <div className="h-dvh px-[60px] max-xs-rmlk:px-[16px] max-md-rmlk:px-[24px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center">
      <div className="grid grid-cols-12 h-[90%] py-[24px] px-[120px] w-[80%] max-md-rmlk:px-[24px] max-md-rmlk:h-[50%] max-xs-rmlk:px-[16px] max-xs-rmlk:w-full max-sm-rmlk:px-[16px] ">
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
