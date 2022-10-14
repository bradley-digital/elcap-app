import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [, setCookie] = useCookies(["user"]);
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
      fetch("http://localhost:3030/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .catch(() => {
          return console.log("Connection to api failed");
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            return console.log(
              "Connection to API failed with a " + res + " code"
            );
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (!data) return;
          setTimeout(() => setLoading(true), 0);
          setTimeout(() => {
            setCookie("user", "admin", { path: "/" });
            router.push("/");
          }, 800);
        });
    },
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
                      {formik.errors.email ? (
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
                      {formik.errors.password ? (
                        <div className={styles.errorMsg}>
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <IonButton type="submit">Login</IonButton>
                </form>

                <div className={styles.socialLogin}>
                  <IonButton color="light" type="submit">
                    Google
                  </IonButton>
                  <IonButton color="tertiary" type="submit">
                    Facebook
                  </IonButton>
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
