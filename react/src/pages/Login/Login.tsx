import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
import styles from "./Login.module.scss";

export default function Login() {
  const router = useIonRouter();
  const { isAuthenticated, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
      const vals = { ...values };
      actions.resetForm();

      async function handleLogin() {
        try {
          await login(vals);
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

      handleLogin();
    },
  });

  const googleLoginBE = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(
        "http://localhost:3030/auth/google",
        {
          code,
        },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );
      console.log("tokens:", tokens);
    },
    flow: "auth-code",
  });

  return (
    <>
      {loading === false ? (
        <IonPage className={styles.loginPage}>
          <IonContent fullscreen className="ion-padding">
            <div className={styles.elcapLogo}>
              <Logo />
              <p>EL CAPITAN PAYMENTS</p>
            </div>
            <div className={styles.contentBottom}>
              <div>
                <IonText>
                  <h1>Login</h1>
                  <p>Hi there! Welcome to El Cap.</p>
                </IonText>

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
                  <IonButton color="light" onClick={googleLoginBE}>
                    Google login BE
                  </IonButton>

                  {/* <IonButton color="light" type="submit">
                    Google
                  </IonButton> */}
                  {/* <IonButton color="tertiary" type="submit">
                    Facebook
                  </IonButton> */}
                </div>

                <div className={styles.accountHelp}>
                  <Link to="/" className={styles.forgotPassword}>
                    Forgot Password?
                  </Link>
                  <Link to="/register" className={styles.register}>
                    Create Account
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
