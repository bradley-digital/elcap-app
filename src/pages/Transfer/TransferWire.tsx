// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import WireTransfer from "components/TransferWire/TransferWire";

export default function TransferWire() {
  return (
    <PageTemplate title="Wire transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <WireTransfer />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
