// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton } from "@ionic/react";
import { ReactComponent as GoogleLogo } from "assets/google-icon.svg";

// styles
import "./SocialLoginButton.scss";

export default function GoogleLoginButton() {
  const { googleLogin } = useAuth();

  return (
    <IonButton
      color="light"
      className="SocialLoginButton"
      onClick={googleLogin}
    >
      <GoogleLogo /> Google Login
    </IonButton>
  );
}
