import type { Profile } from "hooks/useUser";
import { useIonRouter } from "@ionic/react";

// components
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

// hooks
import { useAtom } from "jotai";
import useUserManagement from "hooks/useUserManagement";

// atoms
import { isOpenAtom } from "atoms/deleteUserModal";

type Props = {
  profile: Profile;
};

export default function UserListModal({ profile }: Props) {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const { deleteUser } = useUserManagement();
  const router = useIonRouter();

  const { id } = profile;

  function closeModal() {
    setIsOpen(false);
  }

  function handleDelete() {
    deleteUser(id);
    setIsOpen(false);
    router.push("/user-management");
  }

  return (
    <IonModal isOpen={isOpen} onWillDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Delete user</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closeModal}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <p>Deleting this user will permanently remove their profile and any related history. Accounts and transactions will not be deleted, but their association with this user will be lost. Are you sure you want to continue?</p>
        </IonText>
        <IonButton color="danger" onClick={handleDelete}>
          Delete this user
        </IonButton>
      </IonContent>
    </IonModal>
  );
}
