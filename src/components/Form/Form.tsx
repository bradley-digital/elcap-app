import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton, IonContent, IonIcon, IonPage, IonText } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { ReactComponent as GoogleLogo } from "assets/google-icon.svg";
import Logo from "components/Logo/Logo";

// styles
import "components/Form/Form.scss";

type FormProps = {
  title: string;
  subtitle?: string;
  form?: ReactNode;
  isSocialLoginShown?: boolean;
  accountHelpLeft?: {
    text: string;
    link: string;
  };
  accountHelpCenter?: {
    text: string;
    link: string;
    linkText: string;
  };
  accountHelpRight?: {
    text: string;
    link: string;
  };
};

export default function Form({
  title,
  subtitle,
  form,
  isSocialLoginShown = false,
  accountHelpLeft,
  accountHelpCenter,
  accountHelpRight,
}: FormProps) {
  const { error, googleLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState<ReactNode>(null);

  useEffect(() => {
    error && setErrorMessage(<p>Login failed; Invalid user ID or password.</p>);
  }, [error]);

  return (
    <IonPage className="Form">
      <IonContent fullscreen>
        <Logo />
        <IonText>
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
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

        {form}

        {isSocialLoginShown && (
          <div className="Form__socialLogin">
            <IonButton color="light" onClick={googleLogin}>
              <GoogleLogo /> Google Login
            </IonButton>
          </div>
        )}

        <div className="Form__accountHelp">
          {accountHelpLeft && (
            <Link to={accountHelpLeft.link} className="Form__accountHelp--left">
              {accountHelpLeft.text}
            </Link>
          )}

          {accountHelpCenter && (
            <p>
              {accountHelpCenter.text}{" "}
              <Link
                to={accountHelpCenter.link}
                className="Form__accountHelp--left"
              >
                {accountHelpCenter.linkText}
              </Link>
            </p>
          )}

          {accountHelpRight && (
            <Link
              to={accountHelpRight.link}
              className="Form__accountHelp--right"
            >
              {accountHelpRight.text}
            </Link>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
