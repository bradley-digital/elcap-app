import { ReactComponent as Logo } from '../../assets/elcapitanadvisors_logo.svg';
import {
  IonContent,
  IonPage,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/react';
import './style.scss';

export default function Login() {
  return (
    <IonPage className="Login-page">
      <div className="elcap-logo">
        <Logo />
        <p>EL CAPITAN PAYMENTS</p>
      </div>
      <IonContent fullscreen className="ion-padding">
        <div className="ion-content--bottom">
          <div>
            <IonText>
              <h1>Login</h1>
              <p>Hi there! Welcome to El Cap.</p>
            </IonText>

            <form>
              <IonItem className="ion-inputForm">
                <IonLabel position="stacked" className="login-label">Email</IonLabel>
                <IonInput type="email" className="login-formInput" placeholder="name@email.com" />
              </IonItem>

              <IonItem className="ion-inputForm">
                <IonLabel position="stacked" className="login-label">Password</IonLabel>
                <IonInput type="password" className="login-formInput" />
              </IonItem>

              <div
                className="ion-text-center"
                style={{ paddingTop: 25, paddingBottom: 25, paddingRight: 16 }}>
                <IonButton
                  type="submit">
                  Login
                </IonButton>
              </div>
            </form>

            <div className="social-login"
                 style={{ paddingRight: 16 }}>
              <IonButton color="light" type="submit">
                Google
              </IonButton>
              <IonButton color="tertiary" type="submit">
                Facebook
              </IonButton>
            </div>

            <div className="account-help"
                 style={{ paddingRight: 16 }}>
              <a href="/" className="forgot-password">Forgot Password?</a>
              <a href="/register" className="register">Create Account</a>
            </div>
          </div>
          <div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
