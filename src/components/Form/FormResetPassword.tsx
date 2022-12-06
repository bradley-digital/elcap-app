import { useState } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

// components
import { IonButton, useIonToast } from "@ionic/react";
import { FormInput } from "components/Form/FormInput";

// helpers
import { fetchApi } from "utils/fetchApi";
import {
  passwordValidation,
  confirmPasswordValidation,
} from "helpers/formValidation";
import getErrorMessage from "utils/error";

export default function FormResetPassword() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [present] = useIonToast();
  const { resetToken } = useParams<{ resetToken: string }>();

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
      onSubmit={async (values) => {
        setIsLoaded(true);
        const { resetToken, password } = values;

        try {
          await fetchApi({
            url: "/users/reset-password",
            method: "PATCH",
            resetToken: resetToken,
            password: password,
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
              <li>Contain at least one mixed-case letter.</li>
              <li>Contain at least one number.</li>
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
