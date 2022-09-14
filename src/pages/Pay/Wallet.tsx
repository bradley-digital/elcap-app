import {
  IonAvatar,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import PageTemplate from 'components/PageTemplate'

const chaseLogo = '/assets/chase.png';
const coinbaseLogo = '/assets/coinbase.png';

const paymentMethods = [
  {
    img: chaseLogo,
    name: 'Chase Bank',
    domain: 'chase.com',
  },
  {
    img: coinbaseLogo,
    name: 'Coinbase',
    domain: 'coinbase.com',
  },
];

export default function Wallet() {
  return (
    <PageTemplate title="Payment methods">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <IonList>
              {paymentMethods.map(paymentMethod => (
                <IonItem key={paymentMethod.name}>
                  <IonAvatar slot="start">
                    <img src={paymentMethod.img} alt={paymentMethod.name} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{paymentMethod.name}</h2>
                    <p>{paymentMethod.domain}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </PageTemplate>
  );
}
