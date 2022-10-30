import Card from "../../components/cards/Card";
import DefaultPageLayoutOpen from "../../components/DefaultPageLayoutOpen";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ButtonSmallText from "../../components/button/ButtonSmallText";
import FormLogIn from "../../feature/auth/FormLogIn";
import { CardTitle } from "../../components/cards/CardTitle";
import { CardSubText } from "../../components/cards/CardSubText";

import { ReactComponent as AppleLogo } from "../../assets/icons/apple.svg";
import { ReactComponent as GoogleLogo } from "../../assets/icons/google.svg";
import { ReactComponent as MicrosoftLogo } from "../../assets/icons/microsoft.svg";
import { ReactComponent as MetaMaskLogo } from "../../assets/icons/metamask.svg";
import { useState } from "react";

function LogIn() {
  const [passwordLogin, setPasswordLogin] = useState(false);
  const [loginOptions, setLoginOptions] = useState(true);

  function handlePasswordLogin() {
    setLoginOptions(!loginOptions);
    setPasswordLogin(!passwordLogin);
  }

  return (
    <>
      <DefaultPageLayoutOpen>
        {loginOptions === true && (
          <Card>
            <CardHeaderWrapper>
              <div>
                <CardTitle>Login</CardTitle>
              </div>
            </CardHeaderWrapper>

            <div>
              <div onClick={() => handlePasswordLogin()}>
                <CustomButton>Email</CustomButton>
              </div>
              <Link to={"/signup"}>
                <ButtonSmallText>Sign up</ButtonSmallText>
              </Link>
              <CardSubText>Coming soon</CardSubText>

              <div className="metaMaskItem">
                <CustomButtonDisabled>
                  <ButtonContainer>
                    <MetaMaskLogo />
                    <ButtonText>MetaMask</ButtonText>
                  </ButtonContainer>
                </CustomButtonDisabled>
              </div>

              <div className="googleItem">
                <CustomButtonDisabled>
                  <ButtonContainer>
                    <GoogleLogo />
                    <ButtonText>Google</ButtonText>{" "}
                  </ButtonContainer>
                </CustomButtonDisabled>
              </div>
              <div className="appleItem">
                <CustomButtonDisabled>
                  {" "}
                  <ButtonContainer>
                    <AppleLogo /> <ButtonText>Apple</ButtonText>
                  </ButtonContainer>
                </CustomButtonDisabled>
              </div>
              <div className="microsoftItem">
                <CustomButtonDisabled>
                  <ButtonContainer>
                    <MicrosoftLogo />
                    <ButtonText>Microsoft</ButtonText>{" "}
                  </ButtonContainer>
                </CustomButtonDisabled>
              </div>
            </div>
          </Card>
        )}

        {passwordLogin === true && (
          <Card>
            <CardHeaderWrapper>
              <div>
                <CardTitle>Login</CardTitle>
              </div>
              <div>
                <CardSubText>
                  Enter your credentials to log in to your account
                </CardSubText>
              </div>
            </CardHeaderWrapper>
            <FormLogIn />
            <div>
              <Link to={"/forgot-password"}>
                <ButtonSmallText>Forgot password?</ButtonSmallText>
              </Link>
              <Link to={"/signup"}>
                <ButtonSmallText>Sign up</ButtonSmallText>
              </Link>
            </div>
          </Card>
        )}
      </DefaultPageLayoutOpen>
    </>
  );
}

export default LogIn;

const CardHeaderWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  hight: 100%;
  width: 100%;

  gap: 7px;
`;

const CustomButton = styled.button`
  font-family: "DMSans";

  color: #ffffff;
  font-family: "DMSans";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  padding: 7px;
  width: 270px;
  height: 50px;
  background: #4318ff;
  border: 0px solid #000000;
  border-radius: 120px;
  margin: 24px 0px;

  :hover {
    background: #2200b7;
    color: #ffffff;
    border: 0px solid #000000;
    transition: 0.3s all;
  }

  :active {
    transition: 0.3s all;
    transform: translateY(3px);
    opacity: 0.8;
  }
`;

const CustomButtonDisabled = styled.button`
  color: #4318ff;
  font-family: "DMSans";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  padding: 7px;
  width: 270px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #4318ff;
  border-radius: 120px;
  margin: 10px 0px;

  &:hover {
    border: 1px solid #2200b7;
    color: #2200b7;
  }
`;

const ButtonText = styled.div`
  font-family: "DMSans";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
`;
