import SubMenuBar from "../../components/sub-menu/SubMenuBar";
import { Link } from "react-router-dom";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { errorNotification } from "../../components/notifications/Notifications";
import { getOrganizationsForUser } from "../../api/services/OrganizationUserServices";
import { getSpacesForOrganization } from "../../api/services/SpaceProServices";
import { AuthContext } from "../../context/AuthContext";
import { SubMenuContainer } from "../../components/sub-menu/SubMenuContainer";
import { SubMenuItem } from "../../components/sub-menu/SubMenuItem";
import ButtonSmallSubtle from "../../components/button/ButtonSmallSubtle";

import LoaderCircleBig from "../../components/loader/LoaderCircleBig";
import NewSpaceOrganization from "./NewSpaceOrganization";
import ButtonSmallPrimary from "../../components/button/ButtonSmallPrimary";
import ButtonSmallSecondary from "../../components/button/ButtonSmallSecondary";

//TODO move higherlevel components to spacesOverview and separete lower level components to own components in feature componnents
function SpacesSection() {
  const [fetching, setFetching] = useState(true);

  const [organizationsForUser, setOrganizationsForUser] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionObject, setSelectedOptionObject] = useState([]);
  const [spaceProForOrganization, setSpaceProForOrganization] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [createNewSpace, setCreateNewSpace] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await getOrganizationsForUser(user.userUUID);
      if (response.status === 200) {
        if (response.data.length > 0) {
          setOrganizationsForUser(response.data);
          fetchSpacesPro(response.data[0].organization.organizationId);
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

  const fetchSpacesPro = useCallback(async (organizationId) => {
    try {
      const response = await getSpacesForOrganization(organizationId);
      if (response.data) {
        setSpaceProForOrganization(response.data);
      } else {
        setSpaceProForOrganization([]);
      }
    } catch (error) {
      errorNotification("Files could not be loaded");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleOnChangeSelected(value) {
    setFetching(true);
    setSelectedOption(value);

    const currentSelectionObject = organizationsForUser.find(
      (organization) => organization.organization.organizationName === value
    );
    fetchSpacesPro(currentSelectionObject.organization.organizationId);
    setSelectedOptionObject(currentSelectionObject);
    setFetching(false);
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

  function handleOnSpaceDetails(value) {
    window.location.replace(`/spaces/details/${value.spaceUuid}`);
  }

  const renderSpaces = () => {
    if (fetching) {
      return <LoaderCircleBig></LoaderCircleBig>;
    }

    if (organizationsForUser.length === 0) {
      return <LoaderCircleBig></LoaderCircleBig>;
    }
    return (
      <>
        {spaceProForOrganization.map((link, index) => (
          <GridItemContainer key={link.spaceUuid}>
            <CardWrapper>
              <EnvImageWrapper>
                <GridItemContent>
                  <GridItemLink href={`/spaces/${link.photonRoomId}`}>
                    <GridItemImageMask
                      src={link.environmentPro.imageUrl}
                      alt={link.environmentPro.name}
                    ></GridItemImageMask>
                    <GridItemTextContainer>
                      {link.roomIsOnline === true && (
                        <GridItemOnline>
                          <OnlineDot />
                          {link.photonRoomUserDtoList
                            .slice(0, 3)
                            .map((user, index) => (
                              <p key={index}>
                                {link.photonRoomUserDtoList.length - 1 === index
                                  ? user.firstName
                                  : user.firstName + ", "}
                              </p>
                            ))}
                          <p key={index}>
                            {link.photonRoomUserDtoList.length - 4 < index
                              ? ""
                              : " + " +
                                (link.photonRoomUserDtoList.length - 3) +
                                " more"}
                          </p>
                        </GridItemOnline>
                      )}
                    </GridItemTextContainer>
                  </GridItemLink>
                </GridItemContent>
              </EnvImageWrapper>

              <CardContent>
                <Title>{link.spaceName}</Title>
                <Description>{link.description}</Description>
              </CardContent>
              <CardFooter>
                <div onClick={() => handleOnSpaceDetails(link)}>
                  <ButtonSmallSecondary>Details</ButtonSmallSecondary>
                </div>
                <Link to={"/spaces/" + link.photonRoomId}>
                  <ButtonSmallPrimary>Enter Space</ButtonSmallPrimary>
                </Link>
              </CardFooter>
            </CardWrapper>
          </GridItemContainer>
        ))}
      </>
    );
  };

  const renderNewSpace = () => {
    return (
      <>
        <NewSpaceOrganization
          selectedOption={selectedOption}
          setCreateNewSpace={setCreateNewSpace}
        />
      </>
    );
  };

  return (
    <>
      {createNewSpace ? (
        renderNewSpace()
      ) : (
        <>
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
                      ))}
                    </select>
                  </SubMenuItem>
                )}
                <SubMenuItem>
                  {admin ? (
                    // <div onClick={() => navigate("/spaces/new-space")}>
                    <div onClick={() => setCreateNewSpace(true)}>
                      <ButtonSmallSubtle>
                        {/*<Plus />*/}
                        Add Space
                      </ButtonSmallSubtle>
                    </div>
                  ) : (
                    <></>
                  )}
                </SubMenuItem>
              </SubMenuBar>
            </SubMenuContainer>
            <SpacesContainer>
              <SpaceOverwiew>
                <SpaceList>
                  <GridContainer>
                    <SpaceGrid>{renderSpaces()}</SpaceGrid>
                  </GridContainer>
                </SpaceList>
              </SpaceOverwiew>
            </SpacesContainer>
          </>
        </>
      )}
    </>
  );
}

export default SpacesSection;

const SpacesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SpaceOverwiew = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const SpaceList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const GridContainer = styled.div`
  height: 100%;
`;

const SpaceGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  row-gap: 40px;
  column-gap: 40px;
  //max-width: 1100px;
  //
  //display: grid;
  //grid-template-columns: 1fr;
  //grid-auto-rows: auto;
  //grid-gap: 30px;
  //gap: 30px;
  width: 100%;
  //padding: 16px 18px 0;
  //overflow-y: visible;

  //@media (min-width: 64em) {
  //
  //  grid-template-columns: repeat(4, 1fr);
  //  padding: 16px 42px 0;
  //  grid-gap: 24px;
  //  gap: 24px;
  //
  //}
  //@media (min-width: 52em) {
  //  grid-template-columns: repeat(2, 1fr);
  //  padding: 16px 24px 0;
  //
  //}
`;

const GridItemContainer = styled.div`
  height: 300px;
  position: relative;
  width: 300px;
`;

const GridItemContent = styled.div`
  height: 150px;
  width: 100%;
  position: relative;
`;

const GridItemLink = styled.a`
  //display: block;
  width: 100%;
  height: 100%;
`;

const GridItemImageMask = styled.img`
  height: 100%;
  width: 100%;
  //position: absolute;
  bottom: 0;
  background: rgb(255, 255, 255);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  //border-bottom-left-radius: 0px;
  //border-bottom-right-radius: 0px;

  //background-size: cover;
  //background-position: center;
  //background-repeat: no-repeat;
`;

const GridItemTextContainer = styled.div`
  color: #fff;
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  padding: 0 24px 20px 28px;
  text-shadow: 0 0.25rem 0.375rem rgb(0 0 0 / 30%);
`;

const GridItemOnline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: 8px;
`;

const OnlineDot = styled.span`
  height: 0.375rem;
  width: 0.375rem;
  background-color: #2d8;
  border-radius: 50%;
  top: 55%;
  transform: translate(-14px, -50%);
  position: absolute;
  box-shadow: 0 4px 6px 0 rgb(0 0 0 / 30%);
`;

const OverFlowMenu = styled.div`
  height: 250px;
  position: relative;
`;

const OverFlowMenuContainer = styled.div`
  position: absolute;
  top: -12px;
  right: -8px;
`;

const MenuToggleButton = styled.div`
  display: none;
  background: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 16px 32px rgb(0 0 0 / 12%);
  transition: 0.25s transform var(--emo-out);
  transform: scale(1);
  transition-delay: 0s;
`;

const MenuContent = styled.div`
  transform: scale(1);
  transform-origin: right top;
  margin-top: 10px;
  min-width: 0;
  width: 100px;
  opacity: 1; //closed = opacity: 0;
`;

const EnvImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  //width: 242px;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  row-gap: 40px;
  column-gap: 40px;
  max-width: 1100px;
`;

const CardWrapper = styled.div`
  height: 300px;
  transition: 0.5s all;
  transform: scale(1);
  background: #ffffff;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);

  border-radius: 30px;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s all; //var(--emo-out);
    box-shadow: 0 16px 48px 0 rgb(0 0 0 / 24%);
  }

  @media only screen and (max-width: 500px) {
    //max-height: 300px;
    //width: 300px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  //width: 280px;
  height: 10px;
  padding: 5px;
  justify-content: space-around;
  //margin-top: auto;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 280px;
  height: 75px;
  padding: 10px;
  align-items: flex-start;
`;

const Title = styled.title`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: var(--font-size-20);
    font-weight: ${theme.font.weight.bold700};
    font-style: normal;
    line-height: 16px;
    /* identical to box height */
    letter-spacing: -0.531474px;
    color: var(--color-secondary-primary-black);
    //margin-left: var(--space-40);
    display: inline-flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    padding-left: 7px;
    padding-bottom: 3px;
  `}
`;
const Description = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: var(--font-size-10);
    font-weight: ${theme.font.weight.regular400};
    font-style: normal;
    line-height: 16px;
    /* identical to box height */
    letter-spacing: -0.531474px;
    color: var(--color-secondary-primary-black);
    //margin-left: var(--space-40);
    display: inline-flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    //width: 200px;
    max-height: 50px;
    //white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 7px;
    padding-right: 7px;
  `}
`;
