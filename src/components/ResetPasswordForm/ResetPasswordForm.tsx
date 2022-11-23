import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { IonButton, useIonToast } from "@ionic/react";
import { useParams } from "react-router-dom";
import styles from "./ResetPasswordForm.module.scss";
import updatePassword from "./update-password";
import getErrorMessage from "utils/error";

export default function ResetPasswordForm() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [present] = useIonToast();
  const { resetToken } = useParams<{ resetToken: string }>();

  const formik = useFormik({
    initialValues: {
      resetToken: resetToken,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password required").min(8).max(28),
      confirmPassword: Yup.string()
        .required("Password required").min(8).max(28)
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
    }),
    onSubmit: async (values) => {
      setIsLoaded(true);
      const { resetToken, password, confirmPassword } = values;

      try {
        await updatePassword(resetToken, password, confirmPassword);
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
    },
  });

  return (
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
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
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
  );
}
