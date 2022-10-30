import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import isTokenValid from "../helpers/IsTokenValid";
import Cookies from "js-cookie";
import axios from "axios";
import { removeUserCookies } from "../helpers/CookieHelper";
import LoaderCirclePrimary from "../components/loader/LoaderCircleBig";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;
  const [isAuth, toggleIsAuth] = useState({
    isAuth: false,
    user: null,
    status: "pending",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && isTokenValid(token)) {
      const decoded = jwt_decode(token);
      fetchUserData(decoded.sub, token);
    } else {
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: "done",
      });
    }
  }, []);

  function login(JWT, user) {
    Cookies.set("token", JWT, { expires: 1 });
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
    if (!user.avatarUrlFullBody) {
      fetchUserData(apiUrl, JWT, "/welcome").then((r) => navigate("/welcome"));
    } else {
      fetchUserData(apiUrl, JWT, "/spaces").then((r) => navigate("/spaces"));
    }
  }

  function logout() {
    localStorage.clear();
    removeUserCookies();
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: "done",
    });
    navigate("/login");
  }

  async function fetchUserData(envUrl, token, redirectUrl) {
    try {
      const tokenLocalStorage = Cookies.get("token");
      const result = await axios.get(apiUrl + `/api/v1/users/self`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLocalStorage}`,
        },
      });

      toggleIsAuth({
        ...isAuth,
        isAuth: true,
        user: {
          email: result.data.email,
          userUUID: result.data.userUUID,
          firstName: result.data.firstName,
          lastname: result.data.lastname,
          avatarUrl: result.data.avatarUrl,
          avatarUrlFullBody: result.data.avatarUrlFullBody,
          profileImageUrl: result.data.profileImageUrl,
        },
        status: "done",
      });
      if (redirectUrl) {
        navigate(redirectUrl);
      }
    } catch (e) {
      console.error(e);
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: "done",
      });
    }
  }

  const contextData = {
    isAuth: isAuth.isAuth,
    user: isAuth.user,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {isAuth.status === "done" ? children : <LoaderCirclePrimary />}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
