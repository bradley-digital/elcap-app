import { IonCol, IonGrid, IonItemGroup, IonList, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import PayTransactionsTransaction from "./components/PayTransactionsTransaction";

export default function Transactions() {
  return (
    <PageTemplate title="Transactions">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <IonList>
              <IonItemGroup>
                <PayTransactionsTransaction />
              </IonItemGroup>
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
