import { useForm } from "react-hook-form";
import { useState } from "react";
import { warningNotification } from "../../components/notifications/Notifications";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { InputFieldError } from "../../components/forms/InputFieldError";
import LoaderCircleSmall from "../../components/loader/LoaderCircleSmall";

function FormSignUp({ emailSend }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    warningNotification(`Not implemented yet`);
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFieldWrapper>
            <InputFieldTitle>Email</InputFieldTitle>
            <input {...register("email", { required: true })} type="email" />
            {errors.email && (
              <InputFieldError>Email is required</InputFieldError>
            )}
          </InputFieldWrapper>
          <button type="submit">
            {loading ? <LoaderCircleSmall /> : "Submit"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default FormSignUp;
