import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import Transactions from "components/Transactions/Transactions";

// consts
import { transactions } from "pages/Pay/consts";

export default function PayTransactions() {
  return (
    <PageTemplate title="Transactions" menuId="pay">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <Transactions transactions={transactions} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
