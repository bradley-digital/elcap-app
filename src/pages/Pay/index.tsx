import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import QRCode from '../../components/QRCode';
import './style.scss';

export default function QR() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan to Pay</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="v-center">
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size-md="6" size-lg="4">
              <QRCode link="https://google.com" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
