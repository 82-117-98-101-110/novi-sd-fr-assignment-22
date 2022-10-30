import DefaultPageLayoutOpen from "../../components/DefaultPageLayoutOpen";
import Card from "../../components/cards/Card";
import { CardTitle } from "../../components/cards/CardTitle";
import { CardSubText } from "../../components/cards/CardSubText";
import { Link } from "react-router-dom";
import ButtonSmallText from "../../components/button/ButtonSmallText";
import FormCreateAccount from "../../feature/account/FormCreateAccount";
import { CardHeaderWrapper } from "../../components/cards/CardHeaderWrapper";

function CreateAccount() {
  return (
    <>
      <DefaultPageLayoutOpen>
        <Card>
          <CardHeaderWrapper>
            <div>
              <CardTitle>Create account</CardTitle>
            </div>
            <div>
              <CardSubText>
                Provide your details to create an account for Ravel
              </CardSubText>
            </div>
          </CardHeaderWrapper>
          <FormCreateAccount />
          <Link to={"/login"}>
            <ButtonSmallText>Log in</ButtonSmallText>
          </Link>
        </Card>
      </DefaultPageLayoutOpen>
    </>
  );
}

export default CreateAccount;
