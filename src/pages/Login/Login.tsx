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
  useIonRouter,
} from '@ionic/react';
import Loader from 'components/Loader/Loader';
import { ReactComponent as Logo } from 'assets/elcapitanadvisors_logo.svg';
import styles from './Login.module.scss';

export default function Login() {
  const router = useIonRouter();
  const [,setCookie] = useCookies(['user']);
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setTimeout(() => setLoading(true), 0);
    setTimeout(() => {
      setCookie('user', 'admin', { path: '/' });
      router.push('/');
    }, 800);
  }

  return (
    <>
      {loading === false ? (
        <IonPage className={styles.loginPage}>
          <IonContent fullscreen className="ion-padding">
            <div className={styles.elcapLogo}>
              <Logo />
              <p>EL CAPITAN PAYMENTS</p>
            </div>
            <div className={styles.contentBottom}>
              <div>
                <IonText>
                  <h1>Login</h1>
                  <p>Hi there! Welcome to El Cap.</p>
                </IonText>

                <form onSubmit={handleSubmit}>
                  <IonItem className={styles.inputRow}>
                    <IonLabel position="stacked" className={styles.inputLabel}>Email</IonLabel>
                    <IonInput type="email" className={styles.formInput} placeholder="name@email.com" />
                  </IonItem>

                  <IonItem className={styles.inputRow}>
                    <IonLabel position="stacked" className={styles.inputLabel}>Password</IonLabel>
                    <IonInput type="password" className={styles.formInput} />
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

                <div className={styles.socialLogin} style={{ paddingRight: 16 }}>
                  <IonButton color="light" type="submit">
                    Google
                  </IonButton>
                  <IonButton color="tertiary" type="submit">
                    Facebook
                  </IonButton>
                </div>

                <div className={styles.accountHelp} style={{ paddingRight: 16 }}>
                  <Link to="/" className={styles.forgotPassword}>Forgot Password?</Link>
                  <Link to="/register" className={styles.register}>Create Account</Link>
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
