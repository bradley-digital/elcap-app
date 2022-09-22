import {
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import PageTemplate from 'components/common/PageTemplate/PageTemplate'
import QRCode from 'components/common/QRCode/QRCode';

export default function Scan() {
  return (
    <PageTemplate title="Scan to pay">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <QRCode link="https://google.com" />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
