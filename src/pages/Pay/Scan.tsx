import QRCode from '../../components/QRCode';
import {
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';

export default function Scan() {
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonCol size-md="8" size-lg="6">
          <QRCode link="https://google.com" />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
