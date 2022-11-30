import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// components
import { IonButton, useIonToast } from "@ionic/react";

// helpers
import sendForgotPasswordEmail from "./send-email";
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
          const res: any = await sendForgotPasswordEmail(values.email);
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
              <input
                name="email"
                type="email"
                disabled={isLoaded}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.formInput}
                placeholder="Email"
              />
              <label className={styles.inputLabel}>Email</label>
              {formik.touched.email && formik.errors.email ? (
                <div className={styles.errorMsg}>{formik.errors.email}</div>
              ) : null}
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
