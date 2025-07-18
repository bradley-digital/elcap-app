// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormTransferExternal from "components/FormTransferExternal/FormTransferExternal";

export default function TransferExternal() {
  return (
    <PageTemplate title="External Transfer" menuId="transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormTransferExternal />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
