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
  useIonRouter,
} from "@ionic/react";
import Loader from "components/Loader/Loader";
import { ReactComponent as Logo } from "assets/elcapitanadvisors_logo.svg";
import { ReactComponent as GoogleLogo } from "assets/google-icon.svg";
import { closeOutline } from "ionicons/icons";

// styles
import styles from "./Login.module.scss";

export default function Login() {
  const router = useIonRouter();
  const { errorMessage, isAuthenticated, googleLogin, login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    errorMessage && setShowError(true);
  }, [errorMessage]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email required"),
      password: Yup.string().required("Password required").min(8).max(28),
    }),
    onSubmit: (values, actions) => {
      const loginValues = { ...values };
      actions.resetForm();

      async function handleLogin() {
        try {
          await login(loginValues);
          if (isAuthenticated) {
            setLoading(true);
            setTimeout(() => {
              router.push("/");
            }, 800);
          }
        } catch (err) {
          console.error(err);
        }
      }

      handleLogin();
    },
  });

  return (
    <>
      {loading === false ? (
        <IonPage className={styles.page}>
          <IonContent fullscreen className="ion-padding">
            <div className={styles.elcapLogo}>
              <Logo />
              <p>EL CAPITAN PAYMENTS</p>
            </div>
            <div className={styles.contentBottom}>
              <div>
                <IonText>
                  <h1>Login</h1>
                  <p>Hi there! Welcome to El Capitan.</p>
                </IonText>
                {showError && errorMessage && (
                  <div className={styles.authError}>
                    {errorMessage}
                    <IonIcon
                      icon={closeOutline}
                      onClick={() =>
                        setShowError(false)
                      }
                    />
                  </div>
                )}

                <form onSubmit={formik.handleSubmit}>
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
                  <IonButton type="submit">Login</IonButton>
                </form>

                <div className={styles.socialLogin}>
                  <IonButton color="light" onClick={googleLogin}>
                    <GoogleLogo /> Google Login
                  </IonButton>
                </div>

                <div className={styles.loginAccountHelp}>
                  <Link to="/" className={styles.forgotPassword}>
                    Forgot password?
                  </Link>
                  <Link to="/register" className={styles.register}>
                    Create account
                  </Link>
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
