import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import QrCode from '../../components/qr-code';

export default function Qr() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <QrCode link="https://google.com" />
      </IonContent>
    </IonPage>
  );
}
