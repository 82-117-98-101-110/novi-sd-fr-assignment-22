import SubMenuBar from "../../components/sub-menu/SubMenuBar";
import UserContactsList from "./UserContactsList";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  getOrganizationsForUser,
  getOrganizationUsers,
} from "../../api/services/OrganizationUserServices";
import { AuthContext } from "../../context/AuthContext";
import ModalAddUser from "./ModalAddUser";
import { errorNotification } from "../../components/notifications/Notifications";
import { SubMenuContainer } from "../../components/sub-menu/SubMenuContainer";
import { SubMenuItem } from "../../components/sub-menu/SubMenuItem";
import LoaderCircleBig from "../../components/loader/LoaderCircleBig";

//TODO move high level logic to a higher component
function ContactsSection() {
  const { user } = useContext(AuthContext);
  const [organizationsForUser, setOrganizationsForUser] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [admin, setAdmin] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionObject, setSelectedOptionObject] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getOrganizationsForUser(user.userUUID);
      if (response.status === 200) {
        if (response.data.length > 0) {
          setOrganizationsForUser(response.data);
          setSelectedOption(response.data[0].organization.organizationName);
          setSelectedOptionObject(response.data[0]);
          setFetching(false);
          if (response.data[0].organizationRole === "ORGANIZATION_ADMIN") {
            setAdmin(true);
          } else if (
            response.data[0].organizationRole === "ORGANIZATION_OWNER"
          ) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
          await fetchOrganizationContacts(
            response.data[0].organization.organizationName
          );
        } else {
          setOrganizationsForUser([]);
          setFetching(false);
        }
      } else {
        setOrganizationsForUser([]);
        setFetching(false);
      }
    } catch (e) {
      errorNotification(e.message);
    }
  }, []);

  const fetchOrganizationContacts = useCallback(async (organizationName) => {
    try {
      const response = await getOrganizationUsers(organizationName);
      setData(response.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function refreshCurrentSelected() {
    fetchOrganizationContacts(
      selectedOptionObject.organization.organizationName
    );
  }

  const renderContacts = () => {
    if (fetching) {
      return <LoaderCircleBig></LoaderCircleBig>;
    }
    if (data.length === 0) {
      //TODO create empty state
      return <LoaderCircleBig></LoaderCircleBig>;
    }
    return (
      <>
        <UserContactsList
          selectedOption={selectedOptionObject.organization.organizationName}
          data={data}
          isAdmin={admin}
          refreshData={refreshCurrentSelected}
        />
      </>
    );
  };

  function handleOnChangeSelected(value) {
    setFetching(true);
    setSelectedOption(value);

    const currentSelectionObject = organizationsForUser.find(
      (organization) => organization.organization.organizationName === value
    );
    fetchOrganizationContacts(
      currentSelectionObject.organization.organizationName
    );
    setSelectedOptionObject(currentSelectionObject);
    if (currentSelectionObject.organizationRole === "ORGANIZATION_ADMIN") {
      setAdmin(true);
    } else if (
      currentSelectionObject.organizationRole === "ORGANIZATION_OWNER"
    ) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }

  return (
    <>
      <SubMenuContainer>
        <SubMenuBar>
          {organizationsForUser.length > 1 && (
            <SubMenuItem>
              <select
                value={selectedOption}
                onChange={(e) => handleOnChangeSelected(e.target.value)}
              >
                {organizationsForUser.map((link, index) => (
                  <option
                    key={link.organization.organizationName}
                    value={link.organization.organizationName}
                  >
                    {link.organization.organizationName}
                  </option>
                ))}{" "}
              </select>
            </SubMenuItem>
          )}

          <SubMenuItem>
            <div>
              {admin ? (
                <ModalAddUser
                  selectedOption={
                    selectedOptionObject.organization.organizationName
                  }
                />
              ) : (
                <></>
              )}
            </div>
          </SubMenuItem>
        </SubMenuBar>
      </SubMenuContainer>
      <ProfileContainer>
        <ProfileOverview>
          <>{renderContacts()}</>
        </ProfileOverview>
      </ProfileContainer>
    </>
  );
}

export default ContactsSection;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileOverview = styled.div``;
