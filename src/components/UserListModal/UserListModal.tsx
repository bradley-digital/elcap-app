import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useAtom } from "jotai";
import { userAtom, isOpenAtom } from "atoms/userListModal";

import FormUserManagement from "components/FormUserManagement/FormUserManagement";

export default function UserListModal() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [user] = useAtom(userAtom);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <IonModal
      isOpen={isOpen}
      onWillDismiss={closeModal}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={closeModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>User management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormUserManagement profile={user} />
      </IonContent>
    </IonModal>
  );
}
