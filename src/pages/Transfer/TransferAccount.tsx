// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import AccountTransfer from "components/TransferAccount/TransferAccount";

export default function TransferAccount() {
  return (
    <PageTemplate title="Account transfer" menuId="transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <AccountTransfer />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
