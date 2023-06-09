// lib
import { currency, date } from "lib/formats";

// hooks
import { useAtom } from "jotai";
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

// atoms
import { idAtom } from "atoms/transferHistoryModal";

// components
import {
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";

export default function TransferHistoryDetails() {
  const { transfers } = useUserWesternAllianceAccount();
  const [transferId] = useAtom(idAtom);

  const transfer = transfers?.find(({ id }) => id === transferId);
  if (typeof transfer === "undefined") return null;

  const {
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

  return (
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
  );
}
