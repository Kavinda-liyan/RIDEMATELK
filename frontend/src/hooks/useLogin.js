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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();
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
      toast.error("Email or password field is empty !");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Success !");
    } catch (error) {
      console.error(error);
      toast.error("Failed to login");
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
  };
};
