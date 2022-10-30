import client from "../Client";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

export const verifyCode = async (payload) => {
  const { code } = payload;
  try {
    const response = await client.post(
      apiUrl + "/v1/auth/passwordless/verify",
      {
        code: code,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const authenticateUser = async (payload) => {
  const { email, password } = payload;
  try {
    const response = await client.post(apiUrl + "/v1/auth/login", {
      email: email,
      password: password,
    });
    return response;
  } catch (e) {
    return e;
  }
};
