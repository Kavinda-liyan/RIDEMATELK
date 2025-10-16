import { Link, useNavigate, useLocation } from "react-router-dom";
import authbanner from "../../assets/Authbanner.jpg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../app/api/usersApiSlice.js";
import { setCredentials } from "../../app/slices/authSlice.js";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      throw new Error("Email or password field is empty ");
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || error.error);
    }
  };
  if (isLoading) {
    return (
      <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
        Error: {error?.data?.message || error.error}
      </div>
    );
  }

  return (
    <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary">
      <div className="grid grid-cols-12 h-full py-[24px] px-[120px]  ">
        <div className="col-span-7 h-full w-full bg-rmlk-dark-light rounded-tl-xl rounded-bl-xl shadow-md">
          <div className="flex justify-center h-full w-full flex-col py-[16px] px-[60px] text-white text-left">
            <h3 className="text-[36px]  text-white">Sign In</h3>
            <p>To access more features.</p>
            <hr className="w-full"></hr>
            <div className="mt-[16px] ">
              <form className="" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-[8px]">
                  <label className="my-[2px]">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete={"current-password"}
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
                </div>
                <div className="flex flex-col mt-[24px] ">
                  <button
                    disabled={isLoading}
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
        <div className="h-full col-span-5 overflow-hidden rounded-tr-xl rounded-br-xl shadow-md">
          <img src={authbanner} alt="authbanner" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
