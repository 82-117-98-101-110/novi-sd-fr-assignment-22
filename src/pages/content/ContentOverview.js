import DefaultPageLayoutClosed from "../../components/DefaultPageLayoutClosed";
import styled from "styled-components";
import { SubMenuContainer } from "../../components/sub-menu/SubMenuContainer";
import SubMenuBar from "../../components/sub-menu/SubMenuBar";
import { SubMenuItem } from "../../components/sub-menu/SubMenuItem";
import UploadFile from "../../feature/content/ModalUploadFile";
import UserFileList from "../../feature/content/UserFileList";
import React, {useState} from 'react';

function ContentOverview() {
  const [file, setFileState] = useState(false);
  return (
    <>
      <DefaultPageLayoutClosed>
        <SubMenuContainer>
          <SubMenuBar>
            <SubMenuItem>
              <div>
                <UploadFile setFileState={setFileState} />
              </div>
            </SubMenuItem>
          </SubMenuBar>
        </SubMenuContainer>
        <ContentContainer>
          <ContentWrapper>
            <UserFileList setFilestate={setFileState} newFileUploaded={file} />
          </ContentWrapper>
        </ContentContainer>
      </DefaultPageLayoutClosed>
    </>
  );
}

export default ContentOverview;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div``;
