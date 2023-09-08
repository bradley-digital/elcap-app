// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormUserTransferExternal from "components/FormUserTransferExternal/FormUserTransferExternal";

export default function MoneyMovementTransferExternal() {
  return (
    <PageTemplate title="External Transfer" menuId="money-movement">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormUserTransferExternal />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
