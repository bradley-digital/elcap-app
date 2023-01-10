// components
import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import PaymentMethods from "components/PaymentMethods/PaymentMethods";

// icons
import { add } from "ionicons/icons";

// consts
import { paymentMethods } from "pages/Pay/consts";

export default function Wallet() {
  return (
    <PageTemplate title="Payment methods" menuId="main">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <PaymentMethods paymentMethods={paymentMethods} />
          </IonCol>
        </IonRow>
      </IonGrid>
      {/* Fabs have to be contained in IonContent */}
      {/* Will need a good way to hand off control of the payment methods */}
      {/* Might need a jotai atom */}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </PageTemplate>
  );
}
