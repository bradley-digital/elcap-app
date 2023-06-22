// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormTransferWire from "components/FormTransferWire/FormTransferWire";

export default function TransferWire() {
  return (
    <PageTemplate title="Wire transfer" menuId="transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormTransferWire />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
