// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton } from "@ionic/react";
import { ReactComponent as GoogleLogo } from "assets/google-icon.svg";

// styles
import "components/Form/Form.scss";

export default function GoogleLoginButton() {
  const { googleLogin } = useAuth();

  return (
    <IonButton color="light" className="Form__socialLoginButton" onClick={googleLogin}>
      <GoogleLogo /> Google Login
    </IonButton>
  );
}
