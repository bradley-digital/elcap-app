import { ReactComponent as Logo } from '../../assets/elcapitanadvisors_logo.svg';
import {
  IonContent,
  IonPage,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
} from '@ionic/react';
import './style.scss';

export default function Register() {
  return (
    <IonPage className="Register-page">
      <div className="elcap-logo">
        <Logo />
        <p>EL CAPITAN PAYMENTS</p>
      </div>
      <IonContent fullscreen className="ion-padding">
        <div className="ion-content--bottom">
          <div>
            <IonText>
              <h1>Sign Up</h1>
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

              <IonItem>
                <IonCheckbox slot='start'></IonCheckbox>
                <IonLabel>I agree to the <a href="/">Terms of Service</a> and <br/><a href="/">Privacy Policy</a></IonLabel>
              </IonItem>

              <div
                className="ion-text-center"
                style={{ paddingTop: 25, paddingBottom: 25, paddingRight: 16 }}>
                <IonButton
                  type="submit">
                  Continue
                </IonButton>
              </div>
            </form>

            <div className="account-help"
                 style={{ paddingRight: 16 }}>
             <p>Have an Account? <a href="/login" className="register">Sign In</a></p>
            </div>
          </div>
          <div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
