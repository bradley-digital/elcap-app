// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";

export default function TransferWire() {
  return (
    <PageTemplate title="Wire transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            Wire transfer
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
