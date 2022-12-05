import { Link } from "react-router-dom";

// components
import { IonContent, IonPage, IonText } from "@ionic/react";
import Logo from "components/Logo/Logo";
import ResetPasswordForm from "components/ResetPasswordForm/ResetPasswordForm";

// styles
import "components/Form/Form.scss";

export default function ResetPassword() {
  return (
    <IonPage className="Form">
      <IonContent fullscreen className="ion-padding">
        <Logo />
        <div>
          <IonText>
            <h1>Reset Password</h1>
          </IonText>
          <ResetPasswordForm />
        </div>
        <div className="Form__accountHelp">
          <Link to="/" className="Form__accountHelp--left">
            Back to login
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
}
