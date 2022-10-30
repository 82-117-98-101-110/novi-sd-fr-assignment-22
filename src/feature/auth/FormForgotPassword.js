import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { InputFieldError } from "../../components/forms/InputFieldError";
import LoaderCircleSmall from "../../components/loader/LoaderCircleSmall";
import { requestResetPassword } from "../../api/services/AccountServices";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "../../components/notifications/Notifications";

function FormForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await requestResetPassword(data);
      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
      }
      if (response.status === 404) {
        errorNotification("Something went wrong, try again");
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      errorNotification(e.data.message);
      setLoading(false);
      reset();
    }
  };

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

export default FormForgotPassword;
