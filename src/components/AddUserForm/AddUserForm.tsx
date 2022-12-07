import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// hooks
import useAuth from "hooks/useAuth";

// components
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
} from "@ionic/react";

import { closeOutline } from "ionicons/icons";

// styles
import styles from "pages/Login/Login.module.scss";

export default function AddUserForm() {
  const { error, register } = useAuth();
  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

  // Not correct
  // Will improve after Jairo's update is merged
  useEffect(() => {
    error && setErrorMessage(<p>A link to activate your account has been emailed to the address provided.</p>);
  }, [error]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name required"),
      lastName: Yup.string().required("Last Name required"),
      email: Yup.string().email().required("Email required"),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
      password: Yup.string().required("Password required").min(8).max(28),
    }),
    onSubmit: (values, actions) => {
      const vals = { ...values };
      actions.resetForm();
      register(vals);
    },
  });

  return (
    <IonPage className={styles.page}>
      <IonContent fullscreen className="ion-padding">
        <div className={styles.contentBottom}>
          <div>
            <IonText>
              <h1>User Management</h1>
            </IonText>
            {errorMessage && (
              <div className={styles.authError}>
                {errorMessage}
                <IonIcon
                  icon={closeOutline}
                  onClick={() =>
                    setErrorMessage(null)
                  }
                />
              </div>
            )}

            <form onSubmit={formik.handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.formInput}
                  placeholder="First Name"
                />
                <label className={styles.inputLabel}>First Name</label>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className={styles.errorMsg}>
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>

              <div className={styles.formGroup}>
                <input
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={styles.formInput}
                  placeholder="First Name"
                />
                <label className={styles.inputLabel}>Last Name</label>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className={styles.errorMsg}>
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>

              <div className={styles.stacked}>
                <div className={styles.formGroup}>
                  <input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.formInput}
                    placeholder="Email"
                  />
                  <label className={styles.inputLabel}>Email</label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className={styles.errorMsg}>
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className={styles.formGroup}>
                  <input
                    name="phone"
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.formInput}
                    placeholder="Phone"
                  />
                  <label className={styles.inputLabel}>Phone</label>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className={styles.errorMsg}>
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>

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
                  <label className={styles.inputLabel}>Password</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className={styles.errorMsg}>
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <IonButton type="submit">Add User</IonButton>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
