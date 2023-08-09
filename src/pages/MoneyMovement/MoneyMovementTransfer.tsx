import { useParams } from "react-router-dom";
import { useIonRouter } from "@ionic/react";

// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import MoneyMovementTransferC from "components/MoneyMovementTransfer/MoneyMovementTransfer";

// hooks
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

export default function MoneyMovementTransfer() {
  const { transfers } = useWesternAllianceAccount();
  const { transferId } = useParams<{ transferId: string }>();
  const router = useIonRouter();

  if (typeof transfers === "undefined") return null;

  const transfer = transfers.find(({ id }) => id === transferId);

  if (typeof transfer === "undefined") {
    router.push("/money-movement");
    return null;
  }

  return (
    <PageTemplate title="Transfer details" menuId="money-movement">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <MoneyMovementTransferC transfer={transfer} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
