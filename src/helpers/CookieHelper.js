import Cookies from "js-cookie";

export const getUser = () => {
  const user = Cookies.get("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const removeUserCookies = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};

export const isTokenSet = () => !!Cookies.get("token");

export const getToken = () => Cookies.get("token") || null;
