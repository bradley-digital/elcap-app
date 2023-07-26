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
  const { updateTransfer } = useWesternAllianceAccount();

  const { id, amount, memo, status, transactionNumber, transferDate, type } =
    transfer;

  const accountName = transfer?.westernAllianceFromAccount?.accountName;
  const accountNumber = transfer?.westernAllianceFromAccount?.accountNumber;
  const externalAccount = transfer?.externalAccount;
  const externalToAccount = transfer?.externalToAccount;
  const externalAccountName = externalToAccount?.accountName;
  const externalAccountNumber = externalToAccount?.accountNumber;
  const financialInstitution = externalToAccount?.financialInstitution;
  const intermediaryBankName = externalToAccount?.intermediaryBankName;
  const intermediaryFurtherCreditTo =
    externalToAccount?.intermediaryFurtherCreditTo;
  const intermediaryRoutingNumber =
    externalToAccount?.intermediaryRoutingNumber;
  const routingNumber = externalToAccount?.routingNumber;
  const submittedBy = `${transfer?.userSubmittedBy?.firstName || ""} ${
    transfer?.userSubmittedBy?.lastName || ""
  }`;
  const updatedBy = `${transfer?.userUpdatedBy?.firstName || ""} ${
    transfer?.userUpdatedBy?.lastName || ""
  }`;
  const useIntermediary = externalToAccount?.useIntermediary;

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
          <>
            <IonItem>
              <IonLabel>To account name</IonLabel>
              <IonText>{accountName}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>To account number</IonLabel>
              <IonText>{accountNumber}</IonText>
            </IonItem>
          </>
        )}
        {externalAccount && (
          <>
            <IonItem>
              <IonLabel>Financial institution</IonLabel>
              <IonText>{financialInstitution}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>To account name</IonLabel>
              <IonText>{externalAccountName}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>To account number</IonLabel>
              <IonText>{externalAccountNumber}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Routing Number</IonLabel>
              <IonText>{routingNumber}</IonText>
            </IonItem>
          </>
        )}
        {externalAccount && useIntermediary && (
          <>
            <IonItem>
              <IonLabel>Intermediary bank name</IonLabel>
              <IonText>{intermediaryBankName}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Intermediary routing number</IonLabel>
              <IonText>{intermediaryRoutingNumber}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>Intermediary further credit to</IonLabel>
              <IonText>{intermediaryFurtherCreditTo}</IonText>
            </IonItem>
          </>
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
