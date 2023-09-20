import { useParams } from "react-router-dom";
import { useIonRouter } from "@ionic/react";

// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";

// hooks
import TransferHistoryDetails from "components/TransferHistoryDetails/TransferHistoryDetails";
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

export default function TransferDetails() {
  const { transfers } = useUserWesternAllianceAccount();
  const { transferId } = useParams<{ transferId: string }>();
  const router = useIonRouter();

  if (typeof transfers === "undefined") return null;

  const transfer = transfers.find(({ id }) => id === transferId);
  if (typeof transfer === "undefined") {
    router.push("/transfer/overview");
    return null;
  }

  return (
    <PageTemplate title="Transfer details" menuId="transfer-details">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <TransferHistoryDetails transfer={transfer} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
