// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";

export default function TransferAccount() {
  return (
    <PageTemplate title="Account transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            Account transfer
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
