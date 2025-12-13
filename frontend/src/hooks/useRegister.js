import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../app/api/usersApiSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const useRegister = () => {
  //Form states
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [Regerror, setRegError] = useState({
    emailError: "",
    passwordError: "",
    usernameError: "",
    confirmPasswordError: "",
    allFieldsError: "",
  });

  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
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

    if (!username && !email && !password && !confirmPassword) {
      toast.error("Please fill in all the empty fields !");
      setRegError((prev) => ({
        ...prev,
        allFieldsError: "All fields are required",
      }));
      return;
    }
    if (!username) {
      toast.error("Username field is empty !");
      setRegError((prev) => ({ ...prev, usernameError: "Username required" }));
      return;
    }
    if (!email) {
      toast.error("Email field is empty !");
      setRegError((prev) => ({ ...prev, emailError: "Email required" }));
      return;
    }
    if (!password) {
      toast.error("Password field is empty !");
      setRegError((prev) => ({ ...prev, passwordError: "Password required" }));
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm Password field is empty !");
      setRegError((prev) => ({
        ...prev,
        confirmPasswordError: "Confirm Password required",
      }));
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password not match !");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      toast.success("Registered successfully !");
      navigate("/signin");
    } catch (err) {
      const message =
        err?.data?.message || err?.message || "Registration failed!";
      setRegError((prev) => ({ ...prev, allFieldsError: message }));
      toast.error(message);
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
    Regerror,
    setRegError,
  };
};
