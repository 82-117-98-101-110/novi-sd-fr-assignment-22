import Cookies from "js-cookie";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

async function RefreshUserData() {
  const [isAuth, toggleIsAuth] = useContext(AuthContext);

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
    // if (redirectUrl) {
    //   navigate(redirectUrl);
    // }
  } catch (e) {
    console.error(e);
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: "done",
    });
  }
}

export default RefreshUserData;
