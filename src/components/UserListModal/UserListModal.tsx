import { useRef } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import { Profile } from "hooks/useUser";
import FormUserManagement from "components/FormUserManagement/FormUserManagement";

type Props = {
  isOpen: boolean;
  close: () => void;
  user?: Profile;
};

export default function UserListModal({
  isOpen,
  close,
  user,
}: Props) {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={isOpen}
      onWillDismiss={close}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={close}>Back</IonButton>
          </IonButtons>
          <IonTitle>User Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormUserManagement profile={user} />
      </IonContent>
    </IonModal>
  );
}
