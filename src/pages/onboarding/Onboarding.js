import DefaultPageLayoutOpen from "../../components/DefaultPageLayoutOpen";
import Card from "../../components/cards/Card";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import CreateAvatarFullBody from "../../feature/account/CreateAvatarFullBody";
import React from "react";
import { CardWrapper } from "../../components/cards/CardWrapper";
import { CardHeaderWrapper } from "../../components/cards/CardHeaderWrapper";

function Onboarding() {
  return (
    <>
      <DefaultPageLayoutOpen>
        <Card>
          <CardWrapper>
            <CardHeaderWrapper>
              <ModalTitle>Create your 3D Avatar</ModalTitle>
              <ModalText>
                To use Ravel, follow the instructions below to create a 3D
                avatar. You can always change your avatar later.
              </ModalText>
            </CardHeaderWrapper>
            <CreateAvatarFullBody />
          </CardWrapper>
        </Card>
      </DefaultPageLayoutOpen>
    </>
  );
}

export default Onboarding;
