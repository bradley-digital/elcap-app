import hash from "object-hash";
import { IonAvatar, IonItem, IonLabel, IonList } from "@ionic/react";

export type PaymentMethod = {
  img: string;
  name: string;
  domain: string;
};

type Props = {
  paymentMethods: PaymentMethod[];
};

export default function PayWalletPaymentMethods({ paymentMethods }: Props) {
  return (
    <IonList>
      {paymentMethods.map((paymentMethod) => (
        <IonItem key={hash(paymentMethod)}>
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
  );
}
