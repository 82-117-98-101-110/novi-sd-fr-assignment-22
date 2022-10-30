import { CardWrapper } from "../../components/cards/CardWrapper";
import { CardHeaderWrapper } from "../../components/cards/CardHeaderWrapper";
import { ModalTitle } from "../../components/modal/ModalTitle";
import { ModalText } from "../../components/modal/ModalText";
import React from "react";
import Card from "../../components/cards/Card";
import styled from "styled-components";
import FormCreateNewSpace from "./FormCreateNewSpace";
import { SubMenuContainer } from "../../components/sub-menu/SubMenuContainer";
import SubMenuBar from "../../components/sub-menu/SubMenuBar";
import { SubMenuItem } from "../../components/sub-menu/SubMenuItem";
import { CardContentWrapper } from "../../components/cards/CardContentWrapper";
import ButtonSmallSubtle from "../../components/button/ButtonSmallSubtle";

function NewSpaceOrganization({ selectedOption, setCreateNewSpace }) {
  return (
    <>
      <SubMenuContainer>
        <SubMenuBar>
          <SubMenuItem onClick={() => setCreateNewSpace(false)}>
            <ButtonSmallSubtle>Go back </ButtonSmallSubtle>
          </SubMenuItem>
          <SubMenuItem></SubMenuItem>
          <SubMenuItem></SubMenuItem>
        </SubMenuBar>
      </SubMenuContainer>
      <DefaultPageClosedContentWrapper>
        <DefaultPageClosedContentContainer>
          <Card>
            <CardWrapper>
              <CardHeaderWrapper>
                <ModalTitle>Add Space</ModalTitle>
                <ModalText>
                  Provide the details below to create and select the environment
                  to add a new Space.
                </ModalText>
              </CardHeaderWrapper>
              <CardContentWrapper>
                <FormCreateNewSpace selectedOption={selectedOption} />
              </CardContentWrapper>
            </CardWrapper>
          </Card>
        </DefaultPageClosedContentContainer>
      </DefaultPageClosedContentWrapper>
    </>
  );
}

export default NewSpaceOrganization;

const DefaultPageClosedContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DefaultPageClosedContentContainer = styled.div`
  //width: 50vw;
  display: flex;
  flex-direction: column;
  //height: 100%;
  justify-content: center;
`;
