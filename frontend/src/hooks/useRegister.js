import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../app/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slices/authSlice";

export const useRegister = () => {
  //Form states
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/signin";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the empty fields !");
    }

    if (password !== confirmPassword) {
      toast.error("Password not match !");
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      toast.success("Registered successfully !");
      navigate("/signin");
    } catch (error) {
      toast.error(
        error?.data?.message || error.message || "Registration failed!"
      );
    }
  };

  return {
    username,
    setuserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    visiblePassword,
    setVisiblePassword,
    visibleConfirmPassword,
    setVisibleConfirmPassword,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
