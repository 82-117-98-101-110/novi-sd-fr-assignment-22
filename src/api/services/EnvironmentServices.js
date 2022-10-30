import client from "../Client";
import axios from "axios";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

const source = axios.CancelToken.source();

export const getEnvironmentWithUuid = async (environmentUuid) => {
  try {
    const response = await client.get(
      apiUrl + `/api/v1/environments/single/${environmentUuid}`
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const publishEnvironmentForUse = async (environmentUuid) => {
  try {
    const response = await client.put(
      apiUrl + `/api/v1/environments/publish/${environmentUuid}`
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const submitEnvironmentForReview = async (environmentUuid) => {
  try {
    const response = await client.put(
      apiUrl + `/api/v1/environments/submissions/${environmentUuid}`
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};
