import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// components
import { IonButton, useIonToast } from "@ionic/react";
import { FormInput } from "components/Form/FormInput";

// lib
import { emailValidation } from "lib/formValidation";
import getErrorMessage from "lib/error";

// hooks
import useAuth from "hooks/useAuth";

export default function ForgotPasswordForm() {
  const { authApi } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [present] = useIonToast();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: emailValidation,
      })}
      onSubmit={async ({ email }) => {
        setIsLoaded(true);
        try {
          const res = await authApi.post("/email/forgot-password", {
            email,
          });
          present({
            duration: 4000,
            keyboardClose: true,
            message: res.data.message,
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
            <FormInput
              label="Email"
              name="email"
              type="email"
              disabled={isLoaded}
              placeholder="Email"
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
