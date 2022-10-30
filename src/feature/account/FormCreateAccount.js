import { useForm } from "react-hook-form";
import { useState } from "react";
import { errorNotification } from "../../components/notifications/Notifications";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { InputFieldError } from "../../components/forms/InputFieldError";
import LoaderCircleSmall from "../../components/loader/LoaderCircleSmall";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { createAccount } from "../../api/services/AccountServices";

function FormCreateAccount() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must contain a minimum of 6 characters"),
    passwordValidate: Yup.string()
      .required("Password is mandatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await createAccount(token, data);
      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
      }
      if (response.status === 404) {
        errorNotification("Something went wrong");
        setLoading(false);
      }

      setLoading(false);
    } catch (error) {
      errorNotification("Cannot create your account");
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFieldWrapper>
            <InputFieldTitle>First name</InputFieldTitle>
            <input {...register("firstName", { required: true })} type="text" />
            {errors.firstName && (
              <InputFieldError>First name is required</InputFieldError>
            )}
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputFieldTitle>Last name</InputFieldTitle>
            <input {...register("lastName", { required: true })} type="text" />
            {errors.lastName && (
              <InputFieldError>Last name is required</InputFieldError>
            )}
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputFieldTitle>New password</InputFieldTitle>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <InputFieldError>{errors.password?.message}</InputFieldError>
            )}
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputFieldTitle>Confirm new password</InputFieldTitle>
            <input
              name="passwordValidate"
              type="password"
              {...register("passwordValidate")}
              className={`form-control ${
                errors.passwordValidate ? "is-invalid" : ""
              }`}
            />
            {errors.passwordValidate && (
              <InputFieldError>
                {errors.passwordValidate?.message}
              </InputFieldError>
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

export default FormCreateAccount;
