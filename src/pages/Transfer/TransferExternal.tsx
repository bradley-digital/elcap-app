// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormTransferExternal from "components/FormTransferExternal/FormTransferExternal";
import FullscreenModal from "components/FullscreenModal/FullscreenModal";

export default function TransferExternal() {
  return (
    <PageTemplate title="External transfer" menuId="transfer">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormTransferExternal />
            <FullscreenModal />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
