import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/api/usersApiSlice";
import { setCredentials } from "../app/slices/authSlice";
import { toast } from "react-toastify";

export const useLogin = () => {
  //Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error: loginError }] = useLoginMutation();
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
    setError({
      emailError: "",
      passwordError: "",
    });

    try {
      if (!email) {
        toast.error("Email field is empty !");
        setError((prev) => ({ ...prev, emailError: "Email required" }));
        return;
      }
      if (!password) {
        toast.error("Password field is empty !");
        setError((prev) => ({ ...prev, passwordError: "Password required" }));
        return;
      }
      if (!password || !email) {
        toast.error("Email or password field is empty !");
        setError({
          emailError: "Email required",
          passwordError: "Password required",
        });
        return;
      }

      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Success !");
    } catch (err) {
      const message =
        err?.data?.message ||
        err?.error ||
        "Something went wrong. Please try again.";

      toast.error(message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isError,
    isLoading,
    handleSubmit,
    error,
    setError,
    loginError,
  };
};
