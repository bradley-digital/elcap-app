import { Link } from "react-router-dom";

// components
import { IonContent, IonPage, IonText } from "@ionic/react";
import Logo from "components/Logo/Logo";
import ForgotPasswordForm from "components/ForgotPasswordForm/ForgotPasswordForm";

// styles
import styles from "components/Form/Form.module.scss";

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
