import styled, { css } from "styled-components";
import { ReactComponent as Download } from "../../assets/icons/download.svg";
import { ButtonSubtle } from "../../assets/styles/ButtonSubtle";
import { requestDownloadUrl } from "../../api/services/UserFilesServices";
import { errorNotification } from "../notifications/Notifications";

const ButtonWrapper = styled.button`
  ${ButtonSubtle}
  ${({ theme }) => css`
    width: 32px;
    height: 32px;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */

    text-align: center;
    letter-spacing: -0.02em;
  `}
`;

const ButtonDownload = (props) => {
  const { id } = props;

  const getFile = async (id) => {
    try {
      const response = await requestDownloadUrl(id);
      const file_path = await response.data.d;
      const a = document.createElement("A");
      a.href = await requestDownloadUrl(id);
      a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      errorNotification("InputFieldError retrieving file");
    }
  };

  const onClick = () => {
    getFile(id);
  };

  return (
    <ButtonWrapper onClick={onClick}>
      <Download></Download>
    </ButtonWrapper>
  );
};

export default ButtonDownload;
