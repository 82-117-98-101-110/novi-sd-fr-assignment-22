import Card from "../../components/cards/Card";
import DefaultPageLayoutOpen from "../../components/DefaultPageLayoutOpen";
import { Link } from "react-router-dom";
import FormForgotPassword from "../../feature/auth/FormForgotPassword";
import { CardTitle } from "../../components/cards/CardTitle";
import { CardSubText } from "../../components/cards/CardSubText";
import ButtonSmallText from "../../components/button/ButtonSmallText";
import { CardHeaderWrapper } from "../../components/cards/CardHeaderWrapper";

function ResetPassword() {
  return (
    <>
      <DefaultPageLayoutOpen>
        <Card>
          <CardHeaderWrapper>
            <div>
              <CardTitle>Forgot password</CardTitle>
            </div>
            <div>
              <CardSubText>
                Enter your email address to receive an email to reset your
                password
              </CardSubText>
            </div>
          </CardHeaderWrapper>
          <FormForgotPassword />
          <Link to={"/login"}>
            <ButtonSmallText>Log in</ButtonSmallText>
          </Link>
        </Card>
      </DefaultPageLayoutOpen>
    </>
  );
}

export default ResetPassword;
