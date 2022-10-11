import { useCookies } from "react-cookie";
import {
  IonAvatar,
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
  useIonRouter,
} from "@ionic/react";
import styles from "./Account.module.scss";

type Profile = {
  img: string;
  name: string;
  username: string;
  joined: string;
  phone: string;
  email: string;
  address: string;
};

const profile: Profile = {
  img: "/assets/headshot.jpg",
  name: "Joshua Bradley",
  username: "joshbradley012",
  joined: "8/20/2022",
  phone: "661-706-9625",
  email: "joshbradleydigital@gmail.com",
  address: "25 Leslie Dr., Santa Barbara, CA",
};

export default function Account() {
  const router = useIonRouter();
  const [, , removeCookie] = useCookies(["user"]);

  const { img, name, username, joined, phone, email, address } = profile;

  function handleLogout() {
    removeCookie("user", { path: "/" });
    router.push("/");
  }

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
                <div className="d-flex ion-justify-content-center">
                  <IonAvatar>
                    <img src={img} alt={name} />
                  </IonAvatar>
                </div>
                <IonText className="ion-text-center">
                  <h1>{name}</h1>
                  <h3>{username}</h3>
                  <p>Joined: {joined}</p>
                </IonText>
                <div className="d-flex ion-justify-content-end">
                  <IonButton onClick={handleLogout} color="danger">
                    Logout
                  </IonButton>
                </div>
              </IonCard>
              <IonList>
                <IonListHeader>Personal information</IonListHeader>
                <IonItem>
                  <IonLabel position="stacked">Name</IonLabel>
                  <IonInput value={name} readonly />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Username</IonLabel>
                  <IonInput value={username} readonly />
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
