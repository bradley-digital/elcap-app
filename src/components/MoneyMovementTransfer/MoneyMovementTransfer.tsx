import type { Transfer } from "hooks/useWesternAllianceAccount";

type Props = {
  transfer: Transfer;
};

// lib
import { currency, date } from "lib/formats";

// hooks
import useWesternAllianceAccount, {
  transferStatusMap,
  transferTypeMap,
} from "hooks/useWesternAllianceAccount";

// components
import {
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

export default function MoneyMovementTransfer({ transfer }: Props) {
  console.log({ transfer });
  const { updateTransfer } = useWesternAllianceAccount();

  const { id, amount, memo, status, transactionNumber, transferDate, type } =
    transfer;

  const accountName = transfer?.westernAllianceFromAccount?.accountTitle;
  const accountNumber = transfer?.westernAllianceFromAccount?.accountNumber;
  const externalAccount = transfer?.externalAccount;
  const externalToAccount = transfer?.externalToAccount;
  const submittedBy = `${transfer?.userSubmittedBy?.firstName || ""} ${
    transfer?.userSubmittedBy?.lastName || ""
  }`;
  const updatedBy = `${transfer?.userUpdatedBy?.firstName || ""} ${
    transfer?.userUpdatedBy?.lastName || ""
  }`;

  function handleApprove() {
    updateTransfer({ id, status: "APPROVED" });
  }

  function handleReject() {
    updateTransfer({ id, status: "REJECTED" });
  }

  return (
    <div>
      <IonButton fill="clear" routerLink="/money-movement">
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
        {!externalAccount && (
          <IonItem>
            <IonLabel>To account name</IonLabel>
            <IonText>{accountName}</IonText>
          </IonItem>
        )}
        {!externalAccount && (
          <IonItem>
            <IonLabel>To account number</IonLabel>
            <IonText>{accountNumber}</IonText>
          </IonItem>
        )}
        {externalAccount && (
          <IonItem>
            <IonLabel>To account name</IonLabel>
            <IonText>{externalToAccount?.accountName}</IonText>
          </IonItem>
        )}
        {externalAccount && (
          <IonItem>
            <IonLabel>To account number</IonLabel>
            <IonText>{externalToAccount?.accountNumber}</IonText>
          </IonItem>
        )}
        {externalAccount && (
          <IonItem>
            <IonLabel>Financial institution</IonLabel>
            <IonText>{externalToAccount?.financialInstitution}</IonText>
          </IonItem>
        )}
        {externalAccount && externalToAccount?.useIntermediary && (
          <IonItem>
            <IonLabel>Intermediary bank name</IonLabel>
            <IonText>{externalToAccount?.intermediaryBankName}</IonText>
          </IonItem>
        )}
        {externalAccount && externalToAccount?.useIntermediary && (
          <IonItem>
            <IonLabel>Intermediary routing number</IonLabel>
            <IonText>{externalToAccount?.intermediaryRoutingNumber}</IonText>
          </IonItem>
        )}
        {externalAccount && externalToAccount?.useIntermediary && (
          <IonItem>
            <IonLabel>Intermediary further credit to</IonLabel>
            <IonText>{externalToAccount?.intermediaryFurtherCreditTo}</IonText>
          </IonItem>
        )}
        {externalAccount && (
          <IonItem>
            <IonLabel>Routing Number</IonLabel>
            <IonText>{externalToAccount?.routingNumber}</IonText>
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
          <IonText>{transferStatusMap[status]}</IonText>
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
      <IonList>
        <IonListHeader>Transfer actions</IonListHeader>
        <IonItem>
          <IonText>
            <h6>Approve transfer</h6>
            <p>Approve this transfer and initiate money movement.</p>
          </IonText>
          <IonButton
            onClick={handleApprove}
            slot="end"
            size="default"
            disabled={status === "APPROVED"}
          >
            Approve transfer
          </IonButton>
        </IonItem>
        <IonItem>
          <IonText>
            <h6>Reject transfer</h6>
            <p>
              Reject this transfer and deny future handling of this transfer.
            </p>
          </IonText>
          <IonButton
            color="danger"
            onClick={handleReject}
            slot="end"
            size="default"
            disabled={status === "APPROVED" || status === "REJECTED"}
          >
            Reject transfer
          </IonButton>
        </IonItem>
      </IonList>
    </div>
  );
}
