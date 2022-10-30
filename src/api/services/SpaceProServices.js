import client from "../Client";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

export const getSpacesForOrganization = async (organizationId) => {
  try {
    const response = await client.get(
      apiUrl + "/api/v1/spaces/pro/spaces/" + organizationId
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const getPublicEnvironments = async () => {
  try {
    const response = await client.get(
      apiUrl + "/api/v1/spaces/environments/pro/all"
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const getSpacePro = async (spaceProId) => {
  try {
    const response = await client.get(
      apiUrl + "/api/v1/spaces/pro/sessions/" + spaceProId
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const deleteSpacePro = async (spaceProUuid) => {
  try {
    const response = await client.delete(
      `${apiUrl}/api/v1/spaces/pro/${spaceProUuid}`
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const getSpaceProWithUuid = async (spaceProUuid) => {
  try {
    const response = await client.get(
      apiUrl + "/api/v1/spaces/pro/spaces/url/" + spaceProUuid
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const getSessionDetails = async (userUuid, spaceProId) => {
  try {
    const response = await client.get(
      apiUrl + "/api/v1/spaces/pro/sessions/" + userUuid + "/" + spaceProId
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const createOrganizationSpace = async (
  spaceName,
  description,
  codeProtected,
  spaceType,
  environmentName,
  defaultSpaceRole,
  userUuid,
  organizationName
) => {
  try {
    const response = await client.post(
      apiUrl + "/api/v1/spaces/pro/organizations/",
      {
        spaceName: spaceName,
        description: description,
        codeProtected: codeProtected,
        spaceType: spaceType,
        environmentName: environmentName,
        defaultSpaceRole: defaultSpaceRole,
        userUuid: userUuid,
        organizationName: organizationName,
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};
