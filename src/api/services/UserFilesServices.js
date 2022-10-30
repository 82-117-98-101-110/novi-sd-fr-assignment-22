import client from "../Client";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

export const getUserFiles = async () => {
  try {
    const response = await client.get(apiUrl + "/api/v1/userfiles");
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const deleteUserFiles = async (id) => {
  try {
    const response = await client.delete(apiUrl + "/api/v1/userfiles/" + id);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const requestDownloadUrl = async (id) => {
  try {
    const response = await client.get(
      apiUrl + "/api/v2/userfiles/download/" + id
    );

    return response;
  } catch (e) {
    console.error(e);
  }
};
