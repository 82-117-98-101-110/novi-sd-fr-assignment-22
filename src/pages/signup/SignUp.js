import DefaultPageLayoutOpen from "../../components/DefaultPageLayoutOpen";
import Card from "../../components/cards/Card";
import { Link } from "react-router-dom";
import { CardTitle } from "../../components/cards/CardTitle";
import { CardSubText } from "../../components/cards/CardSubText";
import ButtonSmallText from "../../components/button/ButtonSmallText";
import FormSignUp from "../../feature/account/FormSignUp";
import { CardHeaderWrapper } from "../../components/cards/CardHeaderWrapper";
import { useState } from "react";

function SignUp() {
  const [emailHasBeenSend, setEmailHasBeenSend] = useState(false);

  function emailSend() {
    setEmailHasBeenSend(true);
  }

  return (
    <>
      <DefaultPageLayoutOpen>
        <Card>
          {emailHasBeenSend ? (
            <CardHeaderWrapper>
              <div>
                <CardTitle>Sign up</CardTitle>
              </div>
              <div>
                <CardSubText>
                  Please check your email to create and activate your account
                </CardSubText>
              </div>
            </CardHeaderWrapper>
          ) : (
            <>
              <CardHeaderWrapper>
                <div>
                  <CardTitle>Sign up</CardTitle>
                </div>
                <div>
                  <CardSubText>
                    Enter your email to sign up to Ravel
                  </CardSubText>
                </div>
              </CardHeaderWrapper>
              <FormSignUp emailSend={emailSend} />
            </>
          )}
          <Link to={"/login"}>
            <ButtonSmallText>Log in</ButtonSmallText>
          </Link>
        </Card>
      </DefaultPageLayoutOpen>
    </>
  );
}

export default SignUp;
