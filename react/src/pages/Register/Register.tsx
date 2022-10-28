import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// contexts
import { AuthContext } from "contexts/AuthContext";

// components
import {
  IonContent,
  IonPage,
  IonText,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import Loader from "components/Loader/Loader";
import { ReactComponent as Logo } from "assets/elcapitanadvisors_logo.svg";

// styles
import styles from "./Register.module.scss";

export default function Register() {
  const router = useIonRouter();
  const { isAuthenticated, register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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

      async function handleRegister() {
        try {
          await register(vals);
          if (isAuthenticated) {
            setTimeout(() => setLoading(true), 0);
            setTimeout(() => {
              router.push("/");
            }, 800);
          }
        } catch (err) {
          console.error(err);
        }
      }

      handleRegister();
    },
  });

  return (
    <>
      {loading === false ? (
        <IonPage className={styles.registerPage}>
          <IonContent fullscreen className="ion-padding">
            <div className={styles.elcapLogo}>
              <Logo />
              <p>EL CAPITAN PAYMENTS</p>
            </div>
            <div className={styles.contentBottom}>
              <div>
                <IonText>
                  <h1>Sign Up</h1>
                </IonText>

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

                  <IonButton type="submit">Register</IonButton>
                </form>

                <div className={styles.accountHelp}>
                  <p>
                    Have an Account?{" "}
                    <Link to="/login" className={styles.register}>
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </IonContent>
        </IonPage>
      ) : (
        <Loader />
      )}
    </>
  );
}
