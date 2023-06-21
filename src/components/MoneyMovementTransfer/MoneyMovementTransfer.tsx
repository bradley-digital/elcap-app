import type { Transfer } from "hooks/useWesternAllianceAccount";

type Props = {
  transfer: Transfer;
};

// lib
import { currency, date } from "lib/formats";

// components
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";

export default function MoneyMovementTransfer({ transfer }: Props) {
  const {
    id,
    accountName,
    accountNumber,
    amount,
    memo,
    status,
    submittedBy,
    transactionNumber,
    transferDate,
    updatedBy,
  } = transfer;

  function handleAccept() {
    console.log(`Accept: ${id}`);
  }

  function handleDeny() {
    console.log(`Deny: ${id}`);
  }

  return (
    <div>
      <IonList>
        <IonItem>
          <IonLabel>Transfer date</IonLabel>
          <IonText>{date(transferDate)}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Account name</IonLabel>
          <IonText>{accountName}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Account number</IonLabel>
          <IonText>{accountNumber}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Amount</IonLabel>
          <IonText>{currency(amount)}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Status</IonLabel>
          <IonText>{status}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Memo</IonLabel>
          <IonText>{memo}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Submitted by</IonLabel>
          <IonText>{submittedBy}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Updated by</IonLabel>
          <IonText>{updatedBy}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Transaction number</IonLabel>
          <IonText>{transactionNumber}</IonText>
        </IonItem>
      </IonList>
      <IonList>
        <IonListHeader>Transfer actions</IonListHeader>
        <IonItem>
          <IonText>
            <h6>Approve transfer</h6>
            <p>Approve this transfer and initiate money movement.</p>
          </IonText>
          <IonButton onClick={handleAccept} slot="end" size="default">Approve transfer</IonButton>
        </IonItem>
        <IonItem>
          <IonText>
            <h6>Deny transfer</h6>
            <p>Deny this transfer and disallow future handling of this transfer.</p>
          </IonText>
          <IonButton color="danger" onClick={handleDeny} slot="end" size="default">Deny transfer</IonButton>
        </IonItem>
      </IonList>
    </div>
  );
}
