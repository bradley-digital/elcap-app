import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { IonButton, useIonToast } from "@ionic/react";
import getErrorMessage from "utils/error";
import sendForgotPasswordEmail from "./send-email";
import styles from "./ForgotPasswordForm.module.scss";

export default function ForgotPasswordForm() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [present] = useIonToast();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email required"),
    }),
    onSubmit: async (values) => {
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
    },
  });

  return (
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
  );
}
