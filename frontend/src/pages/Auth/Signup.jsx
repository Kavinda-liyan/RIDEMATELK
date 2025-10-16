import { Link } from "react-router-dom";
import authbanner from "../../assets/Authbanner.jpg";
const Signup = () => {
  return <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary">
      <div className="grid grid-cols-12 h-full py-[24px] px-[120px]  ">
        <div className="col-span-7 h-full w-full bg-rmlk-dark-light rounded-tl-xl rounded-bl-xl shadow-md">
          <div className="flex justify-center h-full w-full flex-col py-[16px] px-[60px] text-white text-left">
            <h3 className="text-[36px]  text-white">Register user</h3>
            <p>To access more features.</p>
            <hr className="w-full"></hr>
            <div className="mt-[16px]">
              <form>
                <div className="flex flex-col mb-[8px]">
                  <label className="my-[2px]">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name..."
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
                </div>
                <div className="flex flex-col mb-[8px]">
                  <label className="my-[2px]">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
                </div>
                <div className="flex flex-col mb-[8px]">
                  <label className="my-[2px]">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password..."
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
                </div>
                <div className="flex flex-col mb-[8px]">
                  <label className="my-[2px]">Confirm password</label>
                  <input
                    type="password"
                    placeholder="Enter your password..."
                    className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                  ></input>
                </div>
              </form>
            </div>
            <div className="mt-[16px] flex ">
              <p className="text-[12px] text-white/50">
                Already have an Account?{" "}
                <Link to={"/signin"} className="text-white underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="h-full col-span-5 overflow-hidden rounded-tr-xl rounded-br-xl shadow-md">
          <img src={authbanner} alt="authbanner" />
        </div>
      </div>
    </div>;
};

export default Signup;
