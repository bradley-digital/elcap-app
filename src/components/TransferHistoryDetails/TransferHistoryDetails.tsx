import type { Transfer } from "hooks/useWesternAllianceAccount";

type Props = {
  transfer: Transfer;
};

// lib
import { currency, date } from "lib/formats";

// hooks
import { transferTypeMap } from "hooks/useWesternAllianceAccount";

// components
import {
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { portalTransferStatusMap } from "hooks/useUserWesternAllianceAccount";

export default function TransferHistoryDetails({ transfer }: Props) {
  const { amount, memo, status, transactionNumber, transferDate, type } =
    transfer;

  const accountName = transfer?.westernAllianceFromAccount?.accountName;
  const accountNumber = transfer?.westernAllianceFromAccount?.accountNumber;
  const submittedBy = `${transfer?.userSubmittedBy?.firstName || ""} ${
    transfer?.userSubmittedBy?.lastName || ""
  }`;
  const updatedBy = `${transfer?.userUpdatedBy?.firstName || ""} ${
    transfer?.userUpdatedBy?.lastName || ""
  }`;
  const recipientName = transfer?.externalToAccount?.accountName || "";
  const recipientAccountNumber = transfer?.externalToAccount?.accountNumber || "";

  return (
    <div>
      <IonButton fill="clear" routerLink="/transfer/overview">
        <IonIcon slot="start" icon={arrowBack} />
        All transfers
      </IonButton>
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
        {recipientName && (
          <IonItem>
            <IonLabel>Recipient name</IonLabel>
            <IonText>{recipientName}</IonText>
          </IonItem>
        )}
        {recipientAccountNumber && (
          <IonItem>
            <IonLabel>Recipient account number</IonLabel>
            <IonText>{recipientAccountNumber}</IonText>
          </IonItem>
        )}
        <IonItem>
          <IonLabel>Amount</IonLabel>
          <IonText>{currency(Number(amount))}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Type</IonLabel>
          <IonText>{transferTypeMap[type]} transfer</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Status</IonLabel>
          <IonText>{portalTransferStatusMap[status]}</IonText>
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
          <IonText>{transactionNumber || "Not set"}</IonText>
        </IonItem>
      </IonList>
    </div>
  );
}
