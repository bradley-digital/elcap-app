import { IonContent, IonPage, IonText } from "@ionic/react";
import { Link } from "react-router-dom";
import Logo from "components/Logo/Logo";
import ForgotPasswordForm from "components/ForgotPasswordForm/ForgotPasswordForm";
import styles from "./ForgotPassword.module.scss";

export default function ForgotPassword() {
  return (
    <IonPage className={styles.page}>
      <IonContent fullscreen className="ion-padding">
        <Logo />
        <div className={styles.contentBottom}>
          <div>
            <IonText>
              <h1>Forgot Password</h1>
            </IonText>

            <ForgotPasswordForm />
          </div>
          <div className={styles.accountHelp}>
            <Link to="/" className={styles.forgotPassword}>
              Back to login
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
