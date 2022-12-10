import { useState } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

// components
import { IonButton, useIonToast } from "@ionic/react";
import { FormInput } from "components/Form/FormInput";

// lib
import {
  passwordValidation,
  confirmPasswordValidation,
} from "lib/formValidation";
import getErrorMessage from "lib/error";

// hooks
import useAuth from "hooks/useAuth";

// styles
import styles from "./ResetPasswordForm.module.scss";

export default function ResetPasswordForm() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [present] = useIonToast();
  const { resetToken } = useParams<{ resetToken: string }>();
  const { authApi } = useAuth();

  return (
    <Formik
      initialValues={{
        resetToken: resetToken,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation,
      })}
      onSubmit={async ({ resetToken, password }) => {
        setIsLoaded(true);
        try {
          await authApi.patch("/users/reset-password", {
            resetToken,
            password,
          });
          present({
            duration: 4000,
            keyboardClose: true,
            message: "We have reset your password!",
            position: "bottom",
            color: "success",
          });
        } catch (error) {
          setIsLoaded(false);
          present({
            message: getErrorMessage(error),
            duration: 4000,
            position: "bottom",
            color: "danger",
          });
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.stacked}>
            <p>Your new password must:</p>
            <ol>
              <li>Contain 8-36 characters.</li>
            </ol>

            <div className={styles.formGroup}>
              <FormInput
                label="New Password"
                name="password"
                type="password"
                className={styles.formInput}
                placeholder="Password"
              />
            </div>

            <div className={styles.formGroup}>
              <FormInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                className={styles.formInput}
                placeholder="Password"
              />
            </div>
          </div>
          <IonButton disabled={isLoaded} type="submit">
            Go
          </IonButton>
        </form>
      )}
    </Formik>
  );
}
