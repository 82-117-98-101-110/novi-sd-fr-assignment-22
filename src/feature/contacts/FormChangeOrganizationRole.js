import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import LoaderCircleSmall from "../../components/loader/LoaderCircleSmall";
import { warningNotification } from "../../components/notifications/Notifications";

//TODO - implement updating the role of the user for an organization
function FormChangeOrganizationRole({
  userUuid,
  organizationName,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const onCLose = () => closeModal(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      warningNotification("Not implemented yet");
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFieldWrapper>
            <InputFieldTitle>Role</InputFieldTitle>
            <select {...register("organizationRole")}>
              <option value="ORGANIZATION_GUEST">Guest</option>
              <option value="ORGANIZATION_USER">User</option>
              <option value="ORGANIZATION_ADMIN">Admin</option>
            </select>
          </InputFieldWrapper>

          <button type="submit">
            {loading ? <LoaderCircleSmall /> : "Change role"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default FormChangeOrganizationRole;
