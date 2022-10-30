import { useForm } from "react-hook-form";
import React, { useState } from "react";

import {
  errorNotification,
  successNotification,
} from "../../components/notifications/Notifications";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { InputFieldError } from "../../components/forms/InputFieldError";
import LoaderCircleSmall from "../../components/loader/LoaderCircleSmall";
import { inviteUserToOrg } from "../../api/services/OrganizationUserServices";

function FormAddUserToOrg(selectedOption) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await inviteUserToOrg(
        selectedOption.organizationName,
        data.userEmail,
        data.organizationRole
      );
      if (response.status === 202) {
        setLoading(false);
        successNotification("User invited successfully");
        return response.data;
      }
      if (response.status === 400) {
        errorNotification(response.message);
        setLoading(false);
      }
      if (response.status === 403) {
        errorNotification(response.message);
        setLoading(false);
      }
      if (response.status === 409) {
        errorNotification(response.message);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFieldWrapper>
            <InputFieldTitle>Email</InputFieldTitle>
            <input
              {...register("userEmail", { required: true })}
              type="userEmail"
            />
            {errors.userEmail && (
              <InputFieldError>Email is required</InputFieldError>
            )}
          </InputFieldWrapper>
          <InputFieldTitle>Role</InputFieldTitle>
          <select {...register("organizationRole")}>
            <option value={"ORGANIZATION_GUEST"}>Guest</option>
            <option value={"ORGANIZATION_USER"}>User</option>
            <option value={"ORGANIZATION_ADMIN"}>Admin</option>
          </select>
          <button type="submit">
            {loading ? <LoaderCircleSmall /> : "Invite"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default FormAddUserToOrg;
