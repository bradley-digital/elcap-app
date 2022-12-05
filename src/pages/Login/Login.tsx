import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton, IonContent, IonIcon, IonPage, IonText } from "@ionic/react";
import Logo from "components/Logo/Logo";
import { ReactComponent as GoogleLogo } from "assets/google-icon.svg";
import { closeOutline } from "ionicons/icons";
import { FormInput } from "components/Form/FormInput";

// helpers
import { emailValidation, passwordValidation } from "helpers/formValidation";

// styles
import "components/Form/Form.scss";

export default function Login() {
  const { error, googleLogin, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

  useEffect(() => {
    error && setErrorMessage(<p>Login failed; Invalid user ID or password.</p>);
  }, [error]);

  return (
    <IonPage className="Form">
      <IonContent fullscreen>
        <Logo />
        <IonText>
          <h1>Login</h1>
          <p>Hi there! Welcome to El Capitan.</p>
        </IonText>
        {errorMessage && (
          <div className="Form__authError">
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
              <div className="Form__inputGroup">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />

                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                />
              </div>
              <IonButton type="submit">Login</IonButton>
            </form>
          )}
        </Formik>

        <div className="Form__socialLogin">
          <IonButton color="light" onClick={googleLogin}>
            <GoogleLogo /> Google Login
          </IonButton>
        </div>

        <div className="Form__accountHelp">
          <Link
            to="/forgot-password"
            className="Form__accountHelp--left"
          >
            Forgot password?
          </Link>
          <Link to="/register" className="Form__accountHelp--right">
            Create account
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
}
