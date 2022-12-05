import { Link } from "react-router-dom";

// components
import { IonContent, IonPage, IonText } from "@ionic/react";
import Logo from "components/Logo/Logo";
import ForgotPasswordForm from "components/ForgotPasswordForm/ForgotPasswordForm";

// styles
import "components/Form/Form.scss";

export default function ForgotPassword() {
  return (
    <IonPage className="Form">
      <IonContent fullscreen className="ion-padding">
        <Logo />
        <div>
          <IonText>
            <h1>Forgot Password</h1>
          </IonText>

          <ForgotPasswordForm />
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
