// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";

export default function TransferOverview() {
  return (
    <PageTemplate title="Transfers">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            Transfers
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
