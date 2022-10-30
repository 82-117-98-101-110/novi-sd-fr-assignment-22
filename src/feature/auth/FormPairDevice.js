import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../../components/forms/DefaultForm.modules.css";
import { InputFieldWrapper } from "../../components/forms/InputFieldWrapper";
import { InputFieldTitle } from "../../components/forms/InputFieldTitle";
import { InputFieldError } from "../../components/forms/InputFieldError";
import LoaderCircleSmall from "../../components/loader/LoaderCircleSmall";
import { verifyCode } from "../../api/services/AuthenticationServices";
import {
  errorNotification,
  successNotification,
} from "../../components/notifications/Notifications";

function FormPairDevice({ closeModal }) {
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
      const response = await verifyCode(data);
      if (response.status === 200) {
        setLoading(false);
        successNotification("Device paired successfully");
        onCLose();
      }
      if (response.status === 400) {
        errorNotification(response.message);
        setLoading(false);
      }
      setLoading(false);
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
            <InputFieldTitle>Code</InputFieldTitle>
            <input {...register("code", { required: true })} type="text" />
            {errors.firstName && (
              <InputFieldError>Code is required</InputFieldError>
            )}
          </InputFieldWrapper>

          <button type="submit">
            {loading ? <LoaderCircleSmall /> : "Pair"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default FormPairDevice;
