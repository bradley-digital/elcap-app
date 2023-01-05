import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import UserList from "components/UserList/UserList";

export default function UserManagement() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <UserList />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
