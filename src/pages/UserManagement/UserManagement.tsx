import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { useAtom } from "jotai";
import { defaultUser, isOpenAtom, userAtom } from "atoms/userListModal";
import PageTemplate from "components/PageTemplate/PageTemplate";
import UserList from "components/UserList/UserList";

// icons
import { add } from "ionicons/icons";

export default function UserManagement() {
  const [, setUser] = useAtom(userAtom);
  const [, setIsOpen] = useAtom(isOpenAtom);

  function openModal() {
    setUser(defaultUser);
    setIsOpen(true);
  }

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
        <IonFabButton onClick={openModal}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </PageTemplate>
  );
}
