// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormDocfox from "components/FormDocfox/FormDocfox";

export default function ProfileOnboarding() {
  return (
    <PageTemplate title="Onboarding" menuId="profile">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormDocfox />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
