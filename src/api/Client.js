import axios from "axios";
import {getToken, removeUserCookies} from '../helpers/CookieHelper';
import { errorNotification } from "../components/notifications/Notifications";

const client = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use((req) => {
    const token = getToken();
    if (req.headers) {
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        removeUserCookies();
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 500) {
        errorNotification("InputFieldError on server occurred");
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 502) {
        errorNotification("InputFieldError on server occurred");
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 503) {
        errorNotification("InputFieldError on server occurred");
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 504) {
        errorNotification("InputFieldError on server occurred");
        return Promise.reject(error.response.data);
      }
      return error.response;
    }
  );
  return instance;
};

export default client();
