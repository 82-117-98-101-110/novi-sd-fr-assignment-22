import Card from "../../components/cards/Card";
import DefaultPageLayoutOpen from "../../components/DefaultPageLayoutOpen";
import { Link } from "react-router-dom";
import { CardTitle } from "../../components/cards/CardTitle";
import { CardSubText } from "../../components/cards/CardSubText";
import ButtonSmallText from "../../components/button/ButtonSmallText";
import FormResetPassword from "../../feature/auth/FormResetPassword";
import { CardHeaderWrapper } from "../../components/cards/CardHeaderWrapper";

function ResetPassword() {
  return (
    <>
      <DefaultPageLayoutOpen>
        <Card>
          <CardHeaderWrapper>
            <div>
              <CardTitle>Reset password</CardTitle>
            </div>
            <div>
              <CardSubText>
                Enter your new password to reset your current password
              </CardSubText>
            </div>
          </CardHeaderWrapper>
          <FormResetPassword />
          <Link to={"/login"}>
            <ButtonSmallText>Log in</ButtonSmallText>
          </Link>
        </Card>
      </DefaultPageLayoutOpen>
    </>
  );
}

export default ResetPassword;
