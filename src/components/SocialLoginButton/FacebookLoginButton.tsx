// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton } from "@ionic/react";
import { ReactComponent as FacebookLogo } from "assets/facebook.svg";

// styles
import "./SocialLoginButton.scss";

export default function FacebookLoginButton() {
  const { facebookLogin } = useAuth();

  return (
    <IonButton
      color="light"
      className="SocialLoginButton"
      onClick={facebookLogin}
    >
      <FacebookLogo /> Facebook login
    </IonButton>
  );
}
