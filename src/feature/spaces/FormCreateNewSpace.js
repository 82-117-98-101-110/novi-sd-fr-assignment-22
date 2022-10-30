import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { InputFieldError } from "../../components/forms/InputFieldError";
import {
  errorNotification,
  successNotification,
} from "../../components/notifications/Notifications";
import {
  createOrganizationSpace,
  getPublicEnvironments,
} from "../../api/services/SpaceProServices";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function FormCreateNewSpace({ selectedOption }) {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleSubmit2(selectedElement) {
    setValue("environmentUuid", selectedElement);
    handleSubmit(onSubmit)();
  }

  const [loading, setLoading] = useState(false);
  const [environments, setEnvironments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await createOrganizationSpace(
        data.spaceName,
        data.description,
        false,
        "ORGANIZATION",
        data.environmentUuid,
        data.defaultSpaceRole,
        user.userUUID,
        selectedOption
      );
      setLoading(false);
      const spaceId =
        response.headers.location.split("/")[
          response.headers.location.split("/").length - 1
        ];
      successNotification("Space created successfully");
      navigate(`/spaces/${spaceId}`);
    } catch (e) {
      console.error(e);
      errorNotification(e.data.message);
      setLoading(false);
      reset();
    }
  };

  async function getEnvironments() {
    try {
      const response = await getPublicEnvironments();
      if (response.status === 200) {
        if (response.data.length > 0) {
          setEnvironments(response.data);
        } else {
          setEnvironments([]);
        }
      } else {
        errorNotification("InputFieldError getting environments");
        setEnvironments([]);
      }
    } catch (e) {
      console.error(e);
      errorNotification("InputFieldError getting environments");
    }
  }

  useEffect(() => {
    getEnvironments();
  }, []);

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            <TextContainer>
              <TextContainerItemLeft>
                <InputFieldWrapper>
                  <InputFieldTitle>Space name</InputFieldTitle>
                  <input
                    {...register("spaceName", { required: true })}
                    type="text"
                  />
                  {errors.spaceName && (
                    <InputFieldError>Name is required</InputFieldError>
                  )}
                </InputFieldWrapper>
                <InputFieldWrapper>
                  <InputFieldTitle>Default role for all users</InputFieldTitle>
                  <select {...register("defaultSpaceRole")}>
                    <option value="GUEST">Guest</option>
                    <option value="USER">User</option>
                    <option value="PRESENTER">Presenter</option>
                    <option value="MODERATOR">Moderator</option>
                  </select>
                </InputFieldWrapper>
              </TextContainerItemLeft>
              <TextContainerItemRight>
                <InputFieldWrapper>
                  <InputFieldTitle>Description</InputFieldTitle>
                  <textarea
                    {...register("description", { required: true })}
                    type="text"
                  />
                  {errors.description && (
                    <InputFieldError>Description is required</InputFieldError>
                  )}
                </InputFieldWrapper>
              </TextContainerItemRight>
            </TextContainer>
            <InputFieldWrapper>
              <InputFieldTitle
                {...register("environmentUuid", { required: true })}
                type="text"
              />
              {errors.description && (
                <InputFieldError>Description is required</InputFieldError>
              )}
            </InputFieldWrapper>
            <EnvironmentsContainer>
              <EnvironmentsList>
                <EnvGrid>
                  {environments.map((link, index) => (
                    <GridItemContainer
                      onClick={() => handleSubmit2(link.name)}
                      key={link.name}
                    >
                      <CardWrapper>
                        <EnvImageWrapper>
                          <GridItemContent>
                            <GridItemImageMask
                              src={link.imageUrl}
                              alt={link.name}
                            ></GridItemImageMask>
                            <GridItemTextContainer>
                              <GridItemOnline>{link.name}</GridItemOnline>
                            </GridItemTextContainer>
                          </GridItemContent>
                        </EnvImageWrapper>
                      </CardWrapper>
                    </GridItemContainer>
                  ))}
                </EnvGrid>
              </EnvironmentsList>
            </EnvironmentsContainer>
          </FormContainer>
        </form>
      </div>
    </>
  );
}

export default FormCreateNewSpace;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: nowrap;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  align-content: stretch;
  flex-wrap: wrap;
  width: 620px;
`;
const TextContainerItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  //align-content: stretch;
  //width: 50%;
`;
const TextContainerItemRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  //align-content: stretch;
  //width: 50%;
`;

const CardWrapper = styled.div`
  height: 100%;
  transition: 0.5s all;
  transform: scale(1);
  background: rgba(255, 255, 255, 0);
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);

  border-radius: 30px;
  //
  &:hover {
    transform: scale(1.02);
    transition: 0.5s all; //var(--emo-out);

    //box-shadow: 0 16px 48px 0 rgb(0 0 0 / 24%);
  }

  //
  //&:active {
  //  transition: 0.3s all;
  //  transform: translateY(3px);
  //  opacity: 0.8;
  //  border: 2px solid #4318ff;
  //
  //}
  //
  //&:focus {
  //  border: 2px solid #4318ff;
  //}
  @media only screen and (max-width: 500px) {
    //max-height: 300px;
    //width: 300px;
  }
`;

const EnvGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  row-gap: 20px;
  column-gap: 20px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const EnvironmentsContainer = styled.div`
  height: 300px;
  display: flex;
  //flex-direction: row;
  justify-content: center;
  //align-items: center;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  //padding: 20px;
  width: 620px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GridItemOnline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: 8px;
`;

const EnvironmentsList = styled.div`
  height: 100%;
`;

const EnvImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  //width: 242px;
  height: 150px;
  align-items: flex-start;
`;

const GridItemContainer = styled.div`
  height: 100%;
  position: relative;
  width: 290px;
`;

const GridItemContent = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const GridItemImageMask = styled.img`
  height: 100%;
  width: 100%;
  bottom: 0;
  border-radius: 30px;
  //transition: 0.5s all;
  //transform: scale(1);

  &:hover {
    border: 2px solid #4318ff;
    //transform: scale(1.02);
    //transition: 0.5s all; //var(--emo-out);
    //box-shadow: 0 16px 48px 0 rgb(0 0 0 / 24%);
  }
`;

const GridItemTextContainer = styled.div`
  color: #fff;
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  padding: 0 24px 20px 28px;
  text-shadow: 0 0.25rem 0.375rem rgb(0 0 0 / 30%);
`;
