import { IonContent, IonPage, IonText } from "@ionic/react";
import { Link } from "react-router-dom";
import Logo from "components/Logo/Logo";
import ResetPasswordForm from "components/ResetPasswordForm/ResetPasswordForm";
import styles from "./ResetPassword.module.scss";

export default function ResetPassword() {
  return (
    <IonPage className={styles.page}>
      <IonContent fullscreen className="ion-padding">
        <Logo />
        <div className={styles.contentBottom}>
          <div>
            <IonText>
              <h1>Reset Password</h1>
            </IonText>
            <ResetPasswordForm />
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
