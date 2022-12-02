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
import { closeOutline } from "ionicons/icons";
import { FormInput } from "components/Form/FormInput";

// helpers
import {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
} from "helpers/formValidation";

// styles
import styles from "components/Form/Form.module.scss";

export default function Register() {
  const { error, register } = useAuth();
  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

  // Not correct
  // Will improve after Jairo's update is merged
  useEffect(() => {
    error &&
      setErrorMessage(
        <p>
          A link to activate your account has been emailed to the address
          provided.
        </p>
      );
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
              <h1>Sign Up</h1>
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
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
              }}
              validationSchema={Yup.object({
                firstName: firstNameValidation,
                lastName: lastNameValidation,
                email: emailValidation,
                phone: phoneValidation,
                password: passwordValidation,
              })}
              onSubmit={(values, actions) => {
                const vals = { ...values };
                actions.resetForm();
                register(vals);
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <FormInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Jane"
                  />
                  <FormInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="First Name"
                  />
                  <div className={styles.stacked}>
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                    <FormInput
                      label="Phone"
                      name="phone"
                      type="text"
                      placeholder="Phone"
                    />
                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>

                  <IonButton type="submit">Register</IonButton>
                </form>
              )}
            </Formik>

            <div className={styles.registerAccountHelp}>
              <p>
                Have an account?{" "}
                <Link to="/login" className={styles.register}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
