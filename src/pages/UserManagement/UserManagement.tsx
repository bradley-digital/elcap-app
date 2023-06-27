import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/userListModal";
import PageTemplate from "components/PageTemplate/PageTemplate";
import UserList from "components/UserList/UserList";
import UserListModal from "components/UserListModal/UserListModal";

// hooks
import useUserManagement from "hooks/useUserManagement";

// icons
import { add } from "ionicons/icons";

export default function UserManagement() {
  const [, setIsOpen] = useAtom(isOpenAtom);
  const { isSuccess, data } = useUserManagement();

  function openModal() {
    setIsOpen(true);
  }

  if (isSuccess && typeof data !== "undefined") {
    return (
      <PageTemplate title="User management">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <UserList users={data} />
              <UserListModal />
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

  // Need better error state
  return null;
}
