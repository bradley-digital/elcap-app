// lib
import { currency, date } from "lib/formats";

// hooks
import { useAtom } from "jotai";
import { transferTypeMap } from "hooks/useWesternAllianceAccount";
import useUserWesternAllianceAccount, {
  portalTransferStatusMap,
} from "hooks/useUserWesternAllianceAccount";

// atoms
import { idAtom } from "atoms/transferHistoryModal";

// components
import { IonItem, IonLabel, IonList, IonText } from "@ionic/react";

export default function TransferHistoryDetails() {
  const [transferId] = useAtom(idAtom);
  const { transfers } = useUserWesternAllianceAccount();

  const transfer = transfers?.find(({ id }) => id === transferId);
  if (typeof transfer === "undefined") return null;

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
  );
}
