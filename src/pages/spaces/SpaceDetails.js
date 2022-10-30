import DefaultPageLayoutClosed from "../../components/DefaultPageLayoutClosed";
import { SubMenuContainer } from "../../components/sub-menu/SubMenuContainer";
import SubMenuBar from "../../components/sub-menu/SubMenuBar";
import { SubMenuItem } from "../../components/sub-menu/SubMenuItem";

import styled, { css } from "styled-components";
import ButtonBigText from "../../components/button/ButtonBigText";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  errorNotification,
  infoNotification,
  successNotification,
} from "../../components/notifications/Notifications";
import { AuthContext } from "../../context/AuthContext";
import ButtonSmallSubtle from "../../components/button/ButtonSmallSubtle";
import { Heading2 } from "../../assets/styles/Headings";
import { Paragraph } from "../../assets/styles/Paragraphs";
import { ItemHeader } from "../../components/cards/ItemHeader";
import { ItemBody } from "../../components/cards/ItemBody";
import { CardContent } from "../../components/cards/CardContent";
import { ItemTitle } from "../../components/cards/ItemTitle";
import { ItemContainer } from "../../components/cards/ItemContainer";
import { ItemTextSubtile } from "../../components/cards/ItemTextSubtile";
import { ItemText } from "../../components/cards/ItemText";
import { ItemFooter } from "../../components/cards/ItemFooter";
import ButtonMediumPrimary from "../../components/button/ButtonMediumPrimary";
import {
  deleteSpacePro,
  getSpaceProWithUuid,
} from "../../api/services/SpaceProServices";

//TODO: add organization owner to space?
//TODO: add online users to space?
//TODO: add user roles for specific space?
//TODO: add roles to details and change default roles?
function SpaceDetails() {
  const { spaceUuid } = useParams();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState({});
  const [environment, setEnvironment] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await getSpaceProWithUuid(spaceUuid);
      if (response.status === 200) {
        setFetching(false);
        setData(response.data);
        setEnvironment(response.data.environmentPro);
        console.log(response.data);
      }
      if (response.status === 404) {
        setFetching(false);
        navigate("/spaces");
      }
    } catch (e) {
      setFetching(false);
      errorNotification(e.message);
    }
  }, []);

  const deleteSpace = useCallback(async () => {
    try {
      const response = await deleteSpacePro(spaceUuid);
      if (response.status === 204) {
        successNotification("Space deleted successfully");
        navigate("/spaces");
      }
      if (response.status === 404) {
        setFetching(false);
      }
    } catch (e) {
      setFetching(false);
      errorNotification(e.message);
    }
  }, []);

  useEffect(() => {
    fetchData().then((r) => setFetching(false));
  }, [fetchData]);

  function handleOnDelete() {
    deleteSpace();
  }

  function handleOnPreview() {
    infoNotification("Coming soon");
  }

  function convertDate(date) {
    const d = new Date(date);
    return d.toUTCString();
  }

  const renderCard = () => {
    if (fetching) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <GridItemContainer>
          <CardWrapper>
            <EnvImageWrapper>
              <GridItemContent>
                <GridItemLink href={`/spaces/${data.photonRoomId}`}>
                  <GridItemImageMask
                    src={environment.imageUrl}
                    alt={environment.name}
                  ></GridItemImageMask>
                  <GridItemTextContainer></GridItemTextContainer>
                </GridItemLink>
              </GridItemContent>
            </EnvImageWrapper>
            <CardContent>
              <ItemContainer>
                <ItemHeader>
                  <GridHeader>
                    <ItemTitle>
                      <Heading2>Space details</Heading2>
                    </ItemTitle>
                    <div></div>
                    <div onClick={() => handleOnPreview()}>
                      <ButtonMediumPrimary>Enter</ButtonMediumPrimary>
                    </div>
                  </GridHeader>
                </ItemHeader>
                <ItemBody>
                  <GridBody>
                    <ItemTextSubtile>
                      <Paragraph>Name : </Paragraph>{" "}
                    </ItemTextSubtile>
                    <ItemText>
                      <Paragraph>{data.spaceName}</Paragraph>
                    </ItemText>
                  </GridBody>
                  <GridBody>
                    <ItemTextSubtile>
                      <Paragraph>Description: </Paragraph>{" "}
                    </ItemTextSubtile>
                    <ItemText>
                      <Paragraph>{data.description}</Paragraph>
                    </ItemText>
                  </GridBody>
                  <GridBody>
                    <ItemTextSubtile>
                      <Paragraph>Space type : </Paragraph>{" "}
                    </ItemTextSubtile>
                    <ItemText>
                      <Paragraph>{data.spaceType}</Paragraph>
                    </ItemText>
                  </GridBody>
                  <GridBody>
                    <ItemTextSubtile>
                      <Paragraph>Created at : </Paragraph>{" "}
                    </ItemTextSubtile>
                    <ItemText>
                      <Paragraph>{convertDate(data.created_at)}</Paragraph>
                    </ItemText>
                  </GridBody>
                </ItemBody>

                <ItemFooter></ItemFooter>
              </ItemContainer>
              <ItemContainer>
                <ItemHeader>
                  <GridHeader>
                    <ItemTitle>
                      <Heading2>Environment</Heading2>
                    </ItemTitle>
                    <div></div>
                  </GridHeader>
                </ItemHeader>

                <ItemBody>
                  <GridBody>
                    <ItemTextSubtile>
                      <Paragraph>Environment: </Paragraph>{" "}
                    </ItemTextSubtile>
                    <ItemText>
                      <Paragraph>{environment.name}</Paragraph>
                    </ItemText>
                  </GridBody>
                  <GridBody>
                    <ItemTextSubtile>
                      <Paragraph>Short summary: </Paragraph>{" "}
                    </ItemTextSubtile>
                    <ItemText>
                      <Paragraph>{environment.description}</Paragraph>
                    </ItemText>
                  </GridBody>
                </ItemBody>
                <ItemFooter></ItemFooter>
              </ItemContainer>
              <ItemContainer>
                <ItemHeader>
                  <GridHeader>
                    <ItemTitle>
                      <Heading2>Actions</Heading2>
                    </ItemTitle>
                  </GridHeader>
                </ItemHeader>
                <ItemBody>
                  <ActionsWrapper>
                    <div onClick={() => handleOnDelete()}>
                      <ButtonSmallSubtle>Delete</ButtonSmallSubtle>
                    </div>
                    <div onClick={() => handleOnPreview()}>
                      <ButtonSmallSubtle>Update roles</ButtonSmallSubtle>
                    </div>
                    <div onClick={() => handleOnPreview()}>
                      <ButtonSmallSubtle>Create code</ButtonSmallSubtle>
                    </div>
                  </ActionsWrapper>
                </ItemBody>
              </ItemContainer>
            </CardContent>
          </CardWrapper>
        </GridItemContainer>
      </>
    );
  };

  return (
    <>
      <DefaultPageLayoutClosed>
        <SubMenuContainer>
          <SubMenuBar>
            <SubMenuItem>
              <Link to={"/spaces"}>
                <ButtonBigText>Go back</ButtonBigText>
              </Link>
            </SubMenuItem>
            <SubMenuItem></SubMenuItem>
            <SubMenuItem></SubMenuItem>
          </SubMenuBar>
        </SubMenuContainer>
        <EnvironmentContainer>
          <EnvironmentOverview>{renderCard()}</EnvironmentOverview>
        </EnvironmentContainer>
      </DefaultPageLayoutClosed>
    </>
  );
}

export default SpaceDetails;

const EnvironmentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
`;

const GridBody = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`;
const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const EnvironmentOverview = styled.div``;

const GridItemContainer = styled.div`
  //height: 600px;
  position: relative;
  width: 600px;
`;

const GridItemContent = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
`;

const GridItemLink = styled.div`
  width: 100%;
  height: 100%;
`;

const GridItemImageMask = styled.img`
  height: 100%;
  width: 100%;
  bottom: 0;
  background: rgb(255, 255, 255);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
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

const EnvImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CardWrapper = styled.div`
  min-height: 400px;
  background: #ffffff;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  border-radius: 30px;
`;
