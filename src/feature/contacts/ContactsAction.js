import RemoveUserFromOrganization from "./ModalRemoveUserOrganization";
import React from "react";
import styled from "styled-components";
import DropDownContacts from "./DropDownContacts";
import ModalChangeOrganizationRole from "./ModalChangeOrganizationRole";

function ContactsAction({ selectedOption, userUuid, refresh }) {
  return (
    <>
      <DropDownContacts>
        <NavigationItem>
          <RemoveUserFromOrganization
            userUuid={userUuid}
            organizationName={selectedOption}
            refresh={refresh}
          />
        </NavigationItem>
        <NavigationItem>
          <ModalChangeOrganizationRole
            userUuid={userUuid}
            organizationName={selectedOption}
            refresh={refresh}
          />
        </NavigationItem>
      </DropDownContacts>
    </>
  );
}

export default ContactsAction;

const NavigationItem = styled.ul`
  padding: 0.1rem;
  transition: 0.3s all;
  transform: scale(0.95);
  &:hover {
    transform: scale(1);
    transition: 0.3s all;
  }
`;
