import styled from "styled-components";
import "@google/model-viewer";
import React, { useCallback, useEffect, useState } from "react";
import ModalChangeAvatar from "./ModalChangeAvatar";
import ModalChangeAvatarFullBody from "./ModalChangeAvatarFullBody";
import { getSelf } from "../../api/services/AccountServices";
import { errorNotification } from "../../components/notifications/Notifications";
import RavelLogo from "../../assets/images/partners/Ravel.png";
import ReadyPlayerMeLogo from "../../assets/images/partners/readyplayerme.png";

//TODO move higher level components to page and refactor this component to feature components
function ProfileSection() {
  const [user, setUser] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [userFullBodyAvatar, setUserFullBodyAvatar] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [fetching, setFetching] = useState(true);

  const [newUserState, setUserState] = useState(false);

  const createUser = useCallback(async (content) => {
    setUser(content);
    setUserProfileImage(content.profileImageUrl);
    setUserFullBodyAvatar(content.avatarUrlFullBody);
    setUserAvatar(content.avatarUrl);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await getSelf();
      if (response.status === 200) {
        createUser(response.data);
      }
    } catch (error) {
      console.log(error);
      errorNotification("Could not load account");
    }
  }, [createUser]);

  const resetStates = useCallback(() => {
    setUserState(false);
    setUserProfileImage("");
    setUserFullBodyAvatar("");
    setUserAvatar("");
    setUser({});
  }, [setUserState]);

  useEffect(() => {
    if (!user || newUserState) {
      resetStates();
      fetchUser();
    }
  }, [user, newUserState, resetStates, fetchUser]);

  useEffect(() => {
    createUser(user);
  }, [createUser]);

  return (
    <>
      <ProfileContainer>
        <ProfileOverview>
          {fetching && (
            <ProfileWrapper>
              <CardWrapper>
                <UserDetailsImage>
                  <UserProfilePicture img={user.profileImageUrl} />
                </UserDetailsImage>

                <UserDetailsContainer>
                  <UserDetailsText>
                    {user.firstName} {user.lastName}
                  </UserDetailsText>
                  <UserDetailsEmail>{user.email}</UserDetailsEmail>
                </UserDetailsContainer>
                <CardFooter>
                  <GridContainer>
                    <GridItem>
                      <PartnerLogoSmall>
                        <Image src={RavelLogo}></Image>
                      </PartnerLogoSmall>
                    </GridItem>
                    <GridItem></GridItem>
                  </GridContainer>
                </CardFooter>
              </CardWrapper>
              <CardWrapper>
                <UserAvatarContainer>
                  {userFullBodyAvatar ? (
                    <>
                      <script
                        type="module"
                        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                      ></script>
                      <model-viewer
                        id="transform"
                        style={{
                          height: "400px",
                          width: "315px",
                        }}
                        arc-scale
                        autoplay
                        exposure="0.83"
                        min-field-of-view="1deg"
                        field-of-view="20deg"
                        src={user.avatarUrlFullBody}
                        disable-zoom
                        shadow-intensity="1.74"
                        shadow-softness="0.88"
                        camera-controls
                        camera-orbit="20deg 80deg 5.5m"
                        max-camera-orbit="20deg auto"
                        min-camera-orbit="-20deg -auto"
                        environment-image="neutral"
                      >
                        <div className="progress-bar hide" slot="progress-bar">
                          <div className="update-bar"> </div>
                        </div>
                      </model-viewer>
                    </>
                  ) : (
                    <>
                      {" "}
                      <UserDetailsText>Full body Avatar</UserDetailsText>
                      <UserDetailsEmail>
                        You have not setup a full body avatar yet!
                      </UserDetailsEmail>{" "}
                    </>
                  )}
                </UserAvatarContainer>
                <CardFooter>
                  <GridContainer>
                    <GridItem>
                      <PartnerLogoSmall>
                        <Image src={ReadyPlayerMeLogo}></Image>
                      </PartnerLogoSmall>
                    </GridItem>
                    <GridItem>
                      <ModalChangeAvatarFullBody />
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </CardWrapper>
              <CardWrapper>
                <UserAvatarContainer>
                  {userAvatar ? (
                    <>
                      <>
                        <script
                          type="module"
                          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                        ></script>
                        <model-viewer
                          id="transform"
                          style={{
                            height: "400px",
                            width: "315px",
                          }}
                          arc-scale
                          autoplay
                          exposure="0.83"
                          min-field-of-view="1deg"
                          field-of-view="9deg"
                          src={user.avatarUrl}
                          disable-zoom
                          shadow-intensity="1.74"
                          shadow-softness="0.88"
                          camera-controls
                          camera-orbit="20deg 80deg 2.5m"
                          max-camera-orbit="20deg auto"
                          min-camera-orbit="-20deg -auto"
                          environment-image="neutral"
                        >
                          <div
                            className="progress-bar hide"
                            slot="progress-bar"
                          >
                            <div className="update-bar"> </div>
                          </div>
                        </model-viewer>
                      </>
                    </>
                  ) : (
                    <>
                      <UserDetailsText>VR avatar</UserDetailsText>
                      <UserDetailsEmail>
                        You have not setup a VR avatar yet!
                      </UserDetailsEmail>
                    </>
                  )}
                </UserAvatarContainer>
                <CardFooter>
                  <GridContainer>
                    <GridItem>
                      <PartnerLogoSmall>
                        <Image src={ReadyPlayerMeLogo}></Image>
                      </PartnerLogoSmall>
                    </GridItem>

                    <GridItem>
                      <ModalChangeAvatar />
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </CardWrapper>
            </ProfileWrapper>
          )}
        </ProfileOverview>
      </ProfileContainer>
    </>
  );
}

export default ProfileSection;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileOverview = styled.div``;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  flex-flow: column wrap;
  width: 400px;
  min-height: 420px;
  position: relative;
  transform: scale(1);
  transition: 0.5s all;

  padding: 30px 30px;
  background: #ffffff;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  border-radius: 30px;

  &:hover {
    transform: scale(1.05);
    transition: 0.5s all; //var(--emo-out);
    box-shadow: 0 16px 48px 0 rgb(0 0 0 / 24%);
  }

  @media only screen and (max-width: 500px) {
    //max-height: 300px;
    width: 300px;
  }
`;

const PartnerLogoSmall = styled.div`
  width: 50px;
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 20px;
  width: 400px;

  @media only screen and (max-width: 500px) {
    //max-height: 300px;
    width: 300px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  //justify-items: center;
  //align-items: center;
  //justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  //grid-column: 3/3;
`;

const UserProfilePicture = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  //margin: 4px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.img});

  @media only screen and (max-width: 500px) {
    width: 189px;
    height: 189px;
  }
`;

const LogoContainer = styled.div`
  width: 315px;
  height: 315px;
  border-radius: 50%;
  //margin: 4px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  //background-image: url(${(props) => props.img});

  @media only screen and (max-width: 500px) {
    width: 315px;
    height: 315px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const UserDetailsImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserDetailsText = styled.p`
  /* as-text-big */
  font-family: DMSans;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 133% */

  display: flex;
  align-items: center;
  letter-spacing: 0.38px;

  color: #000000;
  margin: 10px;
`;
const UserDetailsEmail = styled.p`
  /* as-text-big */
  font-family: DMSans;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  /* identical to box height, or 133% */
  letter-spacing: 0.38px;
  color: #000000;
  margin: 10px;
`;

const UserAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
