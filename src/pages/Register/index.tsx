import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  IonContent,
  IonPage,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  useIonRouter,
} from '@ionic/react';
import Loader from 'components/Loader';
import { ReactComponent as Logo } from 'assets/elcapitanadvisors_logo.svg';
import './style.scss';

export default function Register() {
  const router = useIonRouter();
  const [,setCookie] = useCookies(['user']);
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setTimeout(() => setLoading(true), 0);
    setTimeout(() => {
      setCookie('user', 'admin', { path: '/' });
      router.push('/');
    }, 850);
  }

  return (
    <>
      {loading === false ? (
        <IonPage className="Register-page">
          <IonContent fullscreen className="ion-padding">
            <div className="elcap-logo">
              <Logo />
              <p>EL CAPITAN PAYMENTS</p>
            </div>
            <div className="ion-content--bottom">
              <div>
                <IonText>
                  <h1>Sign Up</h1>
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

                  <IonItem>
                    <IonCheckbox slot='start'></IonCheckbox>
                    <IonLabel>
                      I agree to the <Link to="/">Terms of Service</Link>
                      and <br/><Link to="/">Privacy Policy</Link>
                    </IonLabel>
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

                <div className="account-help" style={{ paddingRight: 16 }}>
                 <p>Have an Account? <Link to="/login" className="register">Sign In</Link></p>
                </div>
              </div>
              <div>
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
