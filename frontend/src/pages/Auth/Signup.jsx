import { Link } from "react-router-dom";
import authbanner from "../../assets/Authbanner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRegister } from "../../hooks/useRegister";
const Signup = () => {
  const useRegisterHook = useRegister();
  return useRegisterHook.isLoading ? (
    <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
      Loading...
    </div>
  ) : useRegisterHook.isError ? (
    <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
      Error: {useRegisterHook.error?.data?.message || error.error}
    </div>
  ) : (
    <div className="h-dvh  pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center">
      <div className="grid grid-cols-12  h-[90%] py-[24px] px-[120px] w-[80%] ">
        <div className="h-full col-span-6 overflow-hidden shadow-md relative">
          <Link
            replace={true}
            to={"/"}
            className="text-white no-underline absolute top-[18px] left-[18px] border  rounded-full w-[30px] h-[30px] flex justify-center items-center bg-rmlk-dark/50 hover:bg-rmlk-dark-lighter duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-[12px]" />
          </Link>
          <img src={authbanner} alt="authbanner" />
        </div>
        <div className="col-span-6 h-full w-full bg-rmlk-dark-light shadow-md">
          <div className="flex justify-center h-full w-full flex-col py-[16px] px-[40px] text-white text-left">
            <h3 className="text-[36px]  text-white">Register user</h3>
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
                    }}
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
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
                    }}
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
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
                </div>
                <div className="flex flex-col mb-[8px] relative">
                  <label htmlFor="confirmPassword" className="my-[2px]">
                    Confirm password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={`${
                      useRegisterHook.visibleConfirmPassword
                        ? "text"
                        : "password"
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
                      useRegisterHook.setVisibleConfirmPassword(
                        (prev) => !prev
                      );
                    }}
                    className="absolute bottom-[6px] right-[8px] text-white hover:text-white/60 hover:cursor-pointer duration-200"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
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
      </div>
    </div>
  );
};

export default Signup;
