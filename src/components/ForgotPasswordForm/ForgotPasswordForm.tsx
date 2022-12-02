import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// components
import { IonButton, useIonToast } from "@ionic/react";
import { FormInput } from "components/Form/FormInput";

// helpers
// import sendForgotPasswordEmail from "./send-email";
import { fetchApi } from "utils/fetchApi";
import { emailValidation } from "helpers/formValidation";
import getErrorMessage from "utils/error";

// styles
import styles from "./ForgotPasswordForm.module.scss";

export default function ForgotPasswordForm() {
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
      onSubmit={async (values) => {
        setIsLoaded(true);
        try {
          // const res: any = await sendForgotPasswordEmail(values.email);
          const res: any = await fetchApi({
            url: "/email/forgot-password",
            method: "POST",
            email: values.email,
          });
          present({
            duration: 4000,
            keyboardClose: true,
            message: res.message,
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
            <div className={styles.formGroup}>
              <FormInput
                label="Email"
                name="email"
                type="email"
                disabled={isLoaded}
                className={styles.formInput}
                placeholder="Email"
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
