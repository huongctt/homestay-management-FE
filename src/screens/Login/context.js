import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../constant/toast";
import { login, signup } from "../../services/authService";

//context
export const LoginContext = createContext({});

//hook
export const useLoginContext = () => useContext(LoginContext);

//provider
export const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "currentuser",
    "userid",
    "role",
  ]);
  const handleSignup = async (username, password, phone, email, role) => {
    let tmp = `{ "username": "${username}", "password": "${password}", "phone": "${phone}", "email": "${email}", "role": "${role}"}`;
    let params = JSON.parse(tmp);
    if (username && password && phone && email && role) {
      const response = await signup(params);
      if (response?.token) {
        toastSuccess("Success Notification !");
        await setCookie("currentuser", response?.token);
        await setCookie("userid", response?.user._id);
        await setCookie("role", response.user.role);

        setTimeout(() => window.location.reload(), 2000);
      } else {
        toast.error("Can not sign up!");
      }
    } else {
      toast.error("Can not sign up!");
    }
  };

  const handleLogin = async (username, password) => {
    console.log({ username });
    let tmp = `{ "username": "${username}", "password": "${password}" }`;
    let params = JSON.parse(tmp);
    if (username && password) {
      const response = await login(params);
      if (response?.token) {
        toastSuccess("Success Notification !");
        await setCookie("currentuser", response?.token);
        await setCookie("userid", response?.user._id);
        await setCookie("role", response.user.role);
        console.log({ cookies });

        navigate("/home");
      } else toastError(response?.error);
    } else {
      toastError("Error");
    }
  };

  const value = useMemo(
    () => ({
      handleSignup,
      handleLogin,
    }),
    []
  );
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
