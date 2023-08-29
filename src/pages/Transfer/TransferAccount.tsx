// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormTransferAccount from "components/FormTransferAccount/FormTransferAccount";

export default function TransferAccount() {
  return (
    <PageTemplate title="Between Account Transfer" menuId="transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormTransferAccount />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
