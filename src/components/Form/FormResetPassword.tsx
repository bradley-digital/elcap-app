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

export default function FormResetPassword() {
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
          <div className="Form__inputGroup">
            <p>Your new password must:</p>
            <ol>
              <li>Contain 8-36 characters.</li>
            </ol>

            <FormInput
              label="New Password"
              name="password"
              type="password"
              placeholder="Password"
            />

            <FormInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              placeholder="Password"
            />
          </div>
          <IonButton disabled={isLoaded} type="submit">
            Go
          </IonButton>
        </form>
      )}
    </Formik>
  );
}
