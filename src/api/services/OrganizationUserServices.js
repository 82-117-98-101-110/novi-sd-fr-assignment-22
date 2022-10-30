import client from "../Client";

const apiUrl = process.env.REACT_APP_SYSTEMS_BASE_API_URL;

export const getOrganizationUsers = async (organizationName) => {
  try {
    const response = await client.get(
      apiUrl + "/api/v1/organizations/organizations/" + organizationName
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const getOrganizationsForUser = async (userUuid) => {
  try {
    const response = await client.get(
      apiUrl + "/api/v2/organizations/organizationsdetailed/" + userUuid
    );
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const inviteUserToOrg = async (
  organizationName,
  userEmail,
  organizationRole
) => {
  try {
    const response = await client.post(apiUrl + "/api/v1/organizations/users", {
      organizationName: organizationName,
      userEmail: userEmail,
      organizationRole: organizationRole,
    });
    return response;
  } catch (e) {
    return e;
  }
};

export const removeUserFromOrg = async (organizationName, userUUID) => {
  try {
    const response = await client.delete(
      apiUrl +
        "/api/v2/organizations/" +
        organizationName +
        "/userUuid/" +
        userUUID
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const updateOrganizationRole = async (
  organizationName,
  userUUID,
  organizationRole
) => {
  try {
    const response = await client.put(
      apiUrl +
        "/api/v2/organizations/users/roles/" +
        organizationName +
        "/usersUuid/" +
        userUUID +
        "?organizationRole=" +
        organizationRole
    );
    return response;
  } catch (e) {
    return e;
  }
};
