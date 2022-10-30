import styled from "styled-components";
import { deleteUserFiles } from "../../api/services/UserFilesServices";
import { errorNotification } from "../notifications/Notifications";
import ButtonSmallPrimary from "./ButtonSmallPrimary";

const ButtonWrapper = styled.div``;

function ButtonTrash(props) {
  const { id, fetchData } = props;

  const deleteFile = async (id) => {
    try {
      await deleteUserFiles(id);
      fetchData();
    } catch (error) {
      console.error(error);
      errorNotification("InputFieldError deleting file");
    }
  };

  const onClick = () => {
    deleteFile(id);
  };

  return (
    <ButtonWrapper onClick={onClick}>
      <ButtonSmallPrimary>Delete file</ButtonSmallPrimary>
    </ButtonWrapper>
  );
}

export default ButtonTrash;
