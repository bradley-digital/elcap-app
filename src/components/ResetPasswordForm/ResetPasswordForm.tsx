import { useState } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

// components
import { IonButton, useIonToast } from "@ionic/react";

// helpers
// import updatePassword from "./update-password";
import { fetchApi } from "utils/fetchApi";
import {
  passwordValidation,
  confirmPasswordValidation,
} from "helpers/formValidation";
import getErrorMessage from "utils/error";

// styles
import styles from "./ResetPasswordForm.module.scss";

export default function ResetPasswordForm() {
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
          // await updatePassword(resetToken, password);
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
          <div className={styles.stacked}>
            <p>Your new password must:</p>
            <ol>
              <li>Contain 8-36 characters.</li>
              <li>Contain at least one mixed-case letter.</li>
              <li>Contain at least one number.</li>
            </ol>

            <div className={styles.formGroup}>
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.formInput}
                placeholder="Password"
              />

              <label className={styles.inputLabel}>New Password</label>
              {formik.touched.password && formik.errors.password ? (
                <div className={styles.errorMsg}>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className={styles.formGroup}>
              <input
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.formInput}
                placeholder="Password"
              />

              <label className={styles.inputLabel}>Confirm Password</label>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className={styles.errorMsg}>
                  {formik.errors.confirmPassword}
                </div>
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
