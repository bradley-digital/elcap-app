import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton, IonContent, IonIcon, IonPage, IonText } from "@ionic/react";
import { ReactComponent as Logo } from "assets/elcapitanadvisors_logo.svg";
import { ReactComponent as GoogleLogo } from "assets/google-icon.svg";
import { closeOutline } from "ionicons/icons";
import { FormInput } from "components/Form/FormInput";

// lib
import { emailValidation, passwordValidation } from "lib/formValidation";

// styles
import styles from "components/Form/Form.module.scss";

export default function Login() {
  const { error, googleLogin, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

  useEffect(() => {
    error && setErrorMessage(<p>Login failed; Invalid user ID or password.</p>);
  }, [error]);

  return (
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
            {errorMessage && (
              <div className={styles.authError}>
                {errorMessage}
                <IonIcon
                  icon={closeOutline}
                  onClick={() => setErrorMessage(null)}
                />
              </div>
            )}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: emailValidation,
                password: passwordValidation,
              })}
              onSubmit={(values, actions) => {
                const loginValues = { ...values };
                actions.resetForm();
                login(loginValues);
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
                        className={styles.formInput}
                        placeholder="Email"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={styles.formInput}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <IonButton type="submit">Login</IonButton>
                </form>
              )}
            </Formik>

            <div className={styles.socialLogin}>
              <IonButton color="light" onClick={googleLogin}>
                <GoogleLogo /> Google Login
              </IonButton>
            </div>

            <div className={styles.accountHelp}>
              <Link to="/forgot-password" className={styles.forgotPassword}>
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
  );
}
