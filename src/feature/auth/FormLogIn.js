import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { errorNotification } from "../../components/notifications/Notifications";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { InputFieldError } from "../../components/forms/InputFieldError";
import LoaderCircleSmall from "../../components/loader/LoaderCircleSmall";
import {authenticateUser} from '../../api/services/AuthenticationServices';

function FormLogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await authenticateUser(data);
      if (response.status === 200) {
        login(response.data.accessToken, response.data);
        setLoading(false);
        return response.data;
      }
      if (response.status === 400) {
        errorNotification(response.data.message);
        setLoading(false);
      }
      if (response.status === 403) {
        errorNotification(response.data.message);
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
            <input {...register("email", { required: true })} type="email" />
            {errors.email && (
              <InputFieldError>Emails is required</InputFieldError>
            )}
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputFieldTitle>Password</InputFieldTitle>
            <input
              {...register("password", { required: true })}
              type="password"
            />
            {errors.password && (
              <InputFieldError>Password is required</InputFieldError>
            )}
          </InputFieldWrapper>
          <button type="submit">
            {loading ? <LoaderCircleSmall /> : "Log in"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default FormLogIn;
