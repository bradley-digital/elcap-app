import { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

// hooks
import useAuth from "hooks/useAuth";

// Styles
import styles from "./Account.module.scss";

export type Profile = {
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  phone: string;
  email: string;
  address: string;
  role?: string;
};

export default function Account() {
  const { authFetch, logout } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    userName: "",
    createdAt: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    async function getUser() {
      const {
        firstName,
        lastName,
        userName,
        createdAt,
        phone,
        email,
        address,
      } = (await authFetch("/users/account")) as Profile;
      setProfile({
        firstName,
        lastName,
        userName,
        createdAt,
        phone,
        email,
        address,
      });
    }
    getUser();
    // Only run on load
    /* eslint-disable-next-line */
  }, []);

  const { firstName, lastName, userName, createdAt, phone, email, address } =
    profile;

  const joined = new Date(createdAt).toLocaleString("en-US");

  return (
    <IonPage className={styles.accountPage}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <IonCard className={styles.profileCard}>
                <IonText className="ion-text-center">
                  <h1>{`${firstName} ${lastName}`}</h1>
                  <h3>{userName}</h3>
                  <p>Joined: {joined}</p>
                </IonText>
                <div className="d-flex ion-justify-content-end">
                  <IonButton onClick={logout} color="danger">
                    Logout
                  </IonButton>
                </div>
              </IonCard>
              <IonList>
                <IonListHeader>Personal information</IonListHeader>
                <IonItem>
                  <IonLabel position="stacked">First Name</IonLabel>
                  <IonInput value={firstName} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Last Name</IonLabel>
                  <IonInput value={lastName} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Username</IonLabel>
                  <IonInput value={userName} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput value={email} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Phone</IonLabel>
                  <IonInput value={phone} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Address</IonLabel>
                  <IonInput value={address} readonly />
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
