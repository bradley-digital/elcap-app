// components
import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonList,
  IonRow,
} from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import PayWalletPaymentMethods from "./PayWalletPaymentMethods";

// icons
import { add } from "ionicons/icons";

export default function Wallet() {
  return (
    <PageTemplate title="Payment methods" hasMenu={true}>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <IonList>
              <PayWalletPaymentMethods />
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </PageTemplate>
  );
}
