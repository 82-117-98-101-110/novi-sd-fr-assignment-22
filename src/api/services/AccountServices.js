import client from "../Client";
import axios from "axios";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

const source = axios.CancelToken.source();

export const createAccount = async (token, payload) => {
  const { firstName, lastName, password } = payload;
  try {
    const response = await client.post(
      apiUrl + "/api/v1/users/invites/signup?token=" + token,
      {
        firstName: firstName,
        lastName: lastName,
        password: password,
        passwordValidate: password,
      },
      {
        cancelToken: source.token,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const signUp = async (email) => {
  try {
    const response = await client.post(apiUrl + "/api/v1/users/signup", {
      email: email,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const requestResetPassword = async (payload) => {
  const { email } = payload;
  try {
    const response = await client.post(
      apiUrl + "/api/v2/users/resetPasswordRequest",
      {
        email: email,
      },
      {
        cancelToken: source.token,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const setNewPassword = async (token, payload) => {
  const { password, passwordValidate } = payload;
  try {
    const response = await axios.post(
      apiUrl + "/api/v1/users/resetpassword?token=" + token,
      {
        password: password,
        passwordValidate: passwordValidate,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const updateAvatar = async (userUuid, avatarUrl) => {
  try {
    const response = await client.put(
      apiUrl + "/api/v2/users/avatar/" + userUuid,
      {
        avatarUrl,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const updateAvatarFullBody = async (userUuid, avatarUrl) => {
  try {
    const response = await client.put(
      apiUrl + "/api/v2/users/avatar/fullBody/" + userUuid,
      {
        avatarUrl,
      }
    );

    return response;
  } catch (e) {
    console.error(e);
  }
};

export const getSelf = async () => {
  try {
    const response = await client.get(apiUrl + "/api/v1/users/self");
    return response;
  } catch (e) {
    console.error(e);
  }
};
