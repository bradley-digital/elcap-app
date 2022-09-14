import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  IonContent,
  IonPage,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonRouter,
} from '@ionic/react';
import { ReactComponent as Logo } from '../../assets/elcapitanadvisors_logo.svg';
import Loader from '../../components/Loader';
import './style.scss';

export default function Login() {
  const router = useIonRouter();
  const [,setCookie] = useCookies(['user']);
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setTimeout(() => setLoading(true), 0);
    setTimeout(() => {
      setCookie('user', 'admin', {
        path: '/'
      });
      router.push('/');
    }, 800);
  }

  return (
    <>
      {loading === false ? (
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

                <form onSubmit={handleSubmit}>
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

                <div className="social-login" style={{ paddingRight: 16 }}>
                  <IonButton color="light" type="submit">
                    Google
                  </IonButton>
                  <IonButton color="tertiary" type="submit">
                    Facebook
                  </IonButton>
                </div>

                <div className="account-help" style={{ paddingRight: 16 }}>
                  <a href="/" className="forgot-password">Forgot Password?</a>
                  <a href="/register" className="register">Create Account</a>
                </div>
              </div>
            </div>
          </IonContent>
        </IonPage>
      ) : (
        <Loader/>
      )}
    </>
  );
}
