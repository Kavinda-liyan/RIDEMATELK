import { Link } from "react-router-dom";
import authbanner from "../../assets/Authbanner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLogin } from "../../hooks/useLogin";

const Signin = () => {
  const useLoginHook = useLogin();

  if (useLoginHook.isLoading) {
    return (
      <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (useLoginHook.isError) {
    return (
      <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
        Error: {error?.data?.message || error.error}
      </div>
    );
  }

  return (
    <div className="h-dvh pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center">
      <div className="grid grid-cols-12 h-[90%] py-[24px] px-[120px] w-[80%] ">
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
        <div className="col-span-6 h-full w-full bg-rmlk-dark-light  shadow-md  ">
          <div className="flex justify-center h-full w-full flex-col py-[16px] px-[30px] text-white text-left ">
            <h3 className="text-[36px]  text-white">Sign In</h3>
            <p>To access more features.</p>
            <hr className="w-full"></hr>
            <div className="mt-[16px] font-rmlk-secondary text-[12px]">
              <form className="" onSubmit={useLoginHook.handleSubmit}>
                <div className="flex flex-col mb-[8px]">
                  <label className="my-[2px]">Email</label>

                  <input
                    type="email"
                    placeholder="Enter your email..."
                    value={useLoginHook.email}
                    onChange={(e) => {
                      useLoginHook.setEmail(e.target.value);
                    }}
                    autoComplete={"email"}
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
                </div>
                <div className="flex flex-col mb-[8px]">
                  <label className="my-[2px]">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password..."
                    value={useLoginHook.password}
                    onChange={(e) => {
                      useLoginHook.setPassword(e.target.value);
                    }}
                    autoComplete={"current-password"}
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
                </div>
                <div className="flex flex-col mt-[24px] ">
                  <button
                    disabled={useLoginHook.isLoading}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-400 hover:cursor-pointer duration-200 py-[4px] rounded-md shadow-md"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-[16px] flex ">
              <p className="text-[12px] text-white/50">
                Don't have an Account?{" "}
                <Link to={"/signup"} className="text-white underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
