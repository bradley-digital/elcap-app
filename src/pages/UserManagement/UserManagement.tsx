import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
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
        <UserList />
      </IonContent>
    </IonPage>
  );
}
