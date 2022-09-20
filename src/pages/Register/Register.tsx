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
import styles from './Register.module.scss';

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
        <IonPage className={styles.registerPage}>
          <IonContent fullscreen className="ion-padding">
            <div className={styles.elcapLogo}>
              <Logo />
              <p>EL CAPITAN PAYMENTS</p>
            </div>
            <div className={styles.contentBottom}>
              <div>
                <IonText>
                  <h1>Sign Up</h1>
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

                  <IonItem>
                    <IonCheckbox slot='start'></IonCheckbox>
                    <IonLabel>
                      I agree to the <Link to="/">Terms of Service</Link> and <br/><Link to="/">Privacy Policy</Link>
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

                <div className={styles.accountHelp} style={{ paddingRight: 16 }}>
                 <p>Have an Account? <Link to="/login" className={styles.register}>Sign In</Link></p>
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
