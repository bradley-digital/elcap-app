import { useEffect, useRef } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import { OverlayEventDetail } from "@ionic/core/components";
import { Profile } from "hooks/useUser";
import FormUserManagement from "components/FormUserManagement/FormUserManagement";

function UserListModal({
  isOpen,
  onWillDismiss,
  user,
}: {
  isOpen: boolean;
  onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => void;
  user?: Profile;
}) {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={isOpen}
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>Back</IonButton>
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

export default UserListModal;
