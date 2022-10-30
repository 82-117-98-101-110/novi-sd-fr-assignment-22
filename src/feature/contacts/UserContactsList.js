import React from "react";
import Table from "./Table";
import Card from "../../components/cards/Card";
import styled from "styled-components";
import ContactsAction from "./ContactsAction";

//TODO - make action dropdown menu float above card/table instead of being rendered inside card.
function UserContactsList({ selectedOption, data, isAdmin, refreshData }) {
  const statusColorMap = {
    ORGANIZATION_OWNER: "#4318FF",
    ORGANIZATION_ADMIN: "#4318FF",
    ORGANIZATION_USER: "#4318FF",
    ORGANIZATION_GUEST: "#4318FF",
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "profileImageUrl",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              <ProfileImage img={value}></ProfileImage>
            </>
          );
        },
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  const columnsAdmin = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "profileImageUrl",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              <ProfileImage img={value}></ProfileImage>
            </>
          );
        },
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "organizationRole",
        Cell: (props) => {
          return (
            <Tag
              style={{
                color: statusColorMap[props.value],
              }}
            >
              {props.value.split("_")[1]}
            </Tag>
          );
        },
      },
      {
        Header: "",
        accessor: "userUUID",
        Cell: ({ cell: { value } }) => {
          return (
            <>
              <Box>
                <ContactsAction
                  selectedOption={selectedOption}
                  userUuid={value}
                  refresh={refreshData}
                />
              </Box>
            </>
          );
        },
      },
    ],
    []
  );

  if (!isAdmin) {
    return (
      <>
        <Card>
          <ListWrapper>
            <Table columns={columns} data={data} />
          </ListWrapper>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card>
        <ListWrapper>
          <Table columns={columnsAdmin} data={data} />
        </ListWrapper>
      </Card>
    </>
  );
}

export default UserContactsList;

const Box = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileImage = styled.div`
  background-image: url(${(props) => props.img});
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 300px;
  max-height: 500px;
  overflow-x: inherit;
  overflow-y: scroll;
  @media only screen and (max-width: 500px) {
    max-height: 300px;
  }

  .menu-icon {
    margin-left: 8px;
    height: 24px;
    display: inline-block;
  }
`;

const Tag = styled.div``;
