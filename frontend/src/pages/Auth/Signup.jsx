import { Link } from "react-router-dom";
import authbanner from "../../assets/Authbanner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRegister } from "../../hooks/useRegister";
import AuthWrapper from "../../components/Wrappers/AuthWrapper";

const Signup = () => {
  const registerHook = useRegister();

  const backButton = (
    <Link
      replace={true}
      to={"/"}
      className="text-white no-underline absolute top-[18px] left-[18px] border rounded-full w-[30px] h-[30px] flex justify-center items-center bg-rmlk-dark/50 hover:bg-rmlk-dark-lighter duration-200"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-[12px]" />
    </Link>
  );

  if (registerHook.isLoading) {
    return (
      <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
        Registering...
      </div>
    );
  }

  if (registerHook.isError) {
    return (
      <div className="h-dvh pt-[45px] pl-[60px] pr-[60px] bg-rmlk-dark font-rmlk-secondary flex justify-center items-center text-white">
        Error: {registerHook.error?.data?.message || registerHook.error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <AuthWrapper>
      <div className="h-full col-span-6 overflow-hidden shadow-md relative max-xs-rmlk:col-span-12 max-xs-rmlk:hidden max-md-rmlk:col-span-5">
        {backButton}
        <img
          src={authbanner}
          alt="authbanner"
          className="object-cover max-md-rmlk:h-full"
        />
      </div>

      <div className="col-span-6 h-full w-full bg-rmlk-dark-light shadow-md max-xs-rmlk:col-span-12 max-md-rmlk:col-span-7">
        <div className="max-xs-rmlk:block max-2xl-rmlk:hidden">{backButton}</div>

        <div className="flex justify-center h-full w-full flex-col py-[16px] px-[40px] text-white text-left">
          <h3 className="text-[24px] text-white">Register user</h3>
          <p>To access more features.</p>
          <hr className="w-full" />

          <div className="mt-[16px] font-rmlk-secondary text-[12px]">
            <form onSubmit={registerHook.handleSubmit}>
              {/* Username */}
              <div className="flex flex-col mb-[8px]">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name..."
                  value={registerHook.username}
                  onChange={(e) => {
                    registerHook.setuserName(e.target.value);
                    registerHook.setRegError({
                      ...registerHook.Regerror,
                      usernameError: "",
                    });
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                />
                {registerHook.Regerror.usernameError && (
                  <p className="text-red-600 text-[12px] py-[4px]">
                    {registerHook.Regerror.usernameError}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col mb-[8px]">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  autoComplete="new-email"
                  value={registerHook.email}
                  onChange={(e) => {
                    registerHook.setEmail(e.target.value);
                    registerHook.setRegError({
                      ...registerHook.Regerror,
                      emailError: "",
                    });
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                />
                {registerHook.Regerror.emailError && (
                  <p className="text-red-600 text-[12px] py-[4px]">
                    {registerHook.Regerror.emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col mb-[8px] relative">
                <label>Password</label>
                <input
                  type={registerHook.visiblePassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  autoComplete="new-password"
                  value={registerHook.password}
                  onChange={(e) => {
                    registerHook.setPassword(e.target.value);
                    registerHook.setRegError({
                      ...registerHook.Regerror,
                      passwordError: "",
                    });
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    registerHook.setVisiblePassword((prev) => !prev);
                  }}
                  className="absolute bottom-[6px] right-[8px] text-white hover:text-white/60 hover:cursor-pointer duration-200"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {registerHook.Regerror.passwordError && (
                  <p className="text-red-600 text-[12px] py-[4px]">
                    {registerHook.Regerror.passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col mb-[8px] relative">
                <label>Confirm password</label>
                <input
                  type={registerHook.visibleConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password..."
                  autoComplete="new-password"
                  value={registerHook.confirmPassword}
                  onChange={(e) => {
                    registerHook.setConfirmPassword(e.target.value);
                    registerHook.setRegError({
                      ...registerHook.Regerror,
                      confirmPasswordError: "",
                    });
                  }}
                  className="bg-rmlk-dark-lighter text-[12px] p-[6px] rounded-md"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    registerHook.setVisibleConfirmPassword((prev) => !prev);
                  }}
                  className="absolute bottom-[6px] right-[8px] text-white hover:text-white/60 hover:cursor-pointer duration-200"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {registerHook.Regerror.confirmPasswordError && (
                  <p className="text-red-600 text-[12px] py-[4px]">
                    {registerHook.Regerror.confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col mt-[24px]">
                <button
                  type="submit"
                  disabled={registerHook.isLoading}
                  className="bg-blue-500 hover:bg-blue-400 hover:cursor-pointer duration-200 py-[4px] rounded-md shadow-md"
                >
                  {registerHook.isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>

          {/* Login link */}
          <div className="mt-[16px] flex">
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
