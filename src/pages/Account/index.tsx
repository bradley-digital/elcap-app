import {
  IonAvatar,
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
} from '@ionic/react';
import './style.scss';
import headshot from '../../assets/headshot.jpg';

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
  img: headshot,
  name: 'Joshua Bradley',
  username: 'joshbradley012',
  joined: '8/20/2022',
  phone: '661-706-9625',
  email: 'joshbradleydigital@gmail.com',
  address: '25 Leslie Dr., Santa Barbara, CA',
};

export default function Account() {
  const {
    img,
    name,
    username,
    joined,
    phone,
    email,
    address,
  } = profile;
  return (
    <IonPage className="account-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <IonCard className="profile-card">
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
