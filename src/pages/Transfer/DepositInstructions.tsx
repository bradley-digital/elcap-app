// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import Instructions from "components/DepositInstructions/DepositInstructions";

export default function DepositInstructions() {
  return (
    <PageTemplate title="Deposit Instructions" menuId="transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <Instructions />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
