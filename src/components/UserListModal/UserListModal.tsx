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
import { isOpenAtom } from "atoms/userListModal";

import FormCreateUser from "components/FormCreateUser/FormCreateUser";

export default function UserListModal() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <IonModal isOpen={isOpen} onWillDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={closeModal}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>User management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormCreateUser />
      </IonContent>
    </IonModal>
  );
}
