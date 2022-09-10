import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import QRCode from '../../components/QRCode';

export default function QR() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="v-center">
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size-md="6" size-lg="4">
              <IonText>
                <h1>Scan to pay</h1>
              </IonText>
              <QRCode link="https://google.com" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
