import hash from "object-hash";
import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import { paymentMethods } from "./consts";

export default function PayWalletPaymentMethods() {
  return (
    <>
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
    </>
  );
}
