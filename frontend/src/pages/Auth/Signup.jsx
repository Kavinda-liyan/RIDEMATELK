import { Link } from "react-router-dom";
import authbanner from "../../assets/Authbanner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRegister } from "../../hooks/useRegister";
import { use } from "react";
import AuthWrapper from "../../components/Wrappers/AuthWrapper";
const Signup = () => {
  const useRegisterHook = useRegister();

  const backButton = (
    <Link
      replace={true}
      to={"/"}
      className="text-white no-underline absolute top-[18px] left-[18px] border  rounded-full w-[30px] h-[30px] flex justify-center items-center bg-rmlk-dark/50 hover:bg-rmlk-dark-lighter duration-200"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-[12px]" />
    </Link>
  );
  return useRegisterHook.isLoading ? (
    <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
      Loading...
    </div>
  ) : useRegisterHook.isError ? (
    <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
      Error: {useRegisterHook.error?.data?.message || error.error}
    </div>
  ) : (
    <AuthWrapper>
      <div className="h-full col-span-6 overflow-hidden shadow-md relative max-xs-rmlk:col-span-12 max-xs-rmlk:hidden max-md-rmlk:col-span-5">
        {backButton}
        <img
          src={authbanner}
          alt="authbanner"
          className="object-cover max-md-rmlk:h-full"
        />
      </div>
      <div className="col-span-6 h-full w-full bg-rmlk-dark-light shadow-md  max-xs-rmlk:col-span-12 max-md-rmlk:col-span-7 ">
        <div className="max-xs-rmlk:block max-2xl-rmlk:hidden">
          {backButton}
        </div>
        <div className="flex justify-center h-full w-full flex-col py-[16px] px-[40px] text-white text-left">
          <h3 className="text-[24px]  text-white">Register user</h3>
          <p>To access more features.</p>
          <hr className="w-full"></hr>
          <div className="mt-[16px] font-rmlk-secondary text-[12px]">
            <form onSubmit={useRegisterHook.handleSubmit}>
              <div className="flex flex-col mb-[8px]">
                <label className="my-[2px]">Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name..."
                  value={useRegisterHook.username}
                  onChange={(e) => {
                    useRegisterHook.setuserName(e.target.value);
                    useRegisterHook.setRegError({
                      ...useRegisterHook.Regerror,
                      usernameError: "",
                    });
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                ></input>
                {useRegisterHook.Regerror.usernameError && (
                  <p className="text-[12px] py-[4px] text-red-600">
                    {useRegisterHook.Regerror.usernameError}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-[8px]">
                <label className="my-[2px]">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  autoComplete="new-email"
                  value={useRegisterHook.email}
                  onChange={(e) => {
                    useRegisterHook.setEmail(e.target.value);
                    useRegisterHook.setRegError({
                      ...useRegisterHook.Regerror,
                      emailError: "",
                    });
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                ></input>
                {useRegisterHook.Regerror.emailError && (
                  <p className="text-[12px] py-[4px] text-red-600">
                    {useRegisterHook.Regerror.emailError}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-[8px] relative">
                <label className="my-[2px]">Password</label>
                <input
                  type={`${
                    useRegisterHook.visiblePassword ? "text" : "password"
                  }`}
                  placeholder="Enter your password..."
                  autoComplete="new-password"
                  value={useRegisterHook.password}
                  onChange={(e) => {
                    useRegisterHook.setPassword(e.target.value);
                    useRegisterHook.setRegError({
                      ...useRegisterHook.Regerror,
                      passwordError: "",
                    });
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                ></input>
                <button
                  id="viewPW"
                  onClick={(e) => {
                    e.preventDefault();
                    useRegisterHook.setVisiblePassword((prev) => !prev);
                  }}
                  className="absolute bottom-[6px] right-[8px] text-white hover:text-white/60 hover:cursor-pointer duration-200"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {useRegisterHook.Regerror.passwordError && (
                  <p className="text-[12px] py-[4px] text-red-600">
                    {useRegisterHook.Regerror.passwordError}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-[8px] relative">
                <label htmlFor="confirmPassword" className="my-[2px]">
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={`${
                    useRegisterHook.visibleConfirmPassword ? "text" : "password"
                  }`}
                  placeholder="Confirm password..."
                  autoComplete="new-password"
                  value={useRegisterHook.confirmPassword}
                  onChange={(e) => {
                    useRegisterHook.setConfirmPassword(e.target.value);
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md w-full"
                ></input>
                <button
                  id="viewCPW"
                  onClick={(e) => {
                    e.preventDefault();
                    useRegisterHook.setVisibleConfirmPassword((prev) => !prev);
                  }}
                  className="absolute bottom-[6px] right-[8px] text-white hover:text-white/60 hover:cursor-pointer duration-200"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {useRegisterHook.Regerror.confirmPasswordError && (
                  <p className="text-[12px] py-[4px] text-red-600">
                    {useRegisterHook.Regerror.confirmPasswordError}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-[24px] ">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 hover:cursor-pointer duration-200 py-[4px] rounded-md shadow-md"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="mt-[16px] flex ">
            <p className="text-[12px] text-white/50">
              Already have an Account?{" "}
              <Link to={"/signin"} className="text-white underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
