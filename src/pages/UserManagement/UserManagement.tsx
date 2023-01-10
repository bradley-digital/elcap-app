import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import UserList from "components/UserList/UserList";

// icons
import { add } from "ionicons/icons";

export default function UserManagement() {
  return (
    <PageTemplate title="User management">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <UserList />
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
