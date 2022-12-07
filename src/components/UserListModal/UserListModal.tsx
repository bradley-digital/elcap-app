import { useRef } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonListHeader,
  IonList,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { Profile } from "pages/Account/Account";

function UserListModal({
  isOpen,
  onWillDismiss,
  user,
}: {
  isOpen: boolean;
  onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => void;
  user?: Profile;
}) {
  if (!user) return null;

  const modal = useRef<HTMLIonModalElement>(null);
  const { userName, firstName, lastName, email, phone, address } = user || {};
  console.log(user);

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
          <IonTitle>User</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Save Changes
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonListHeader>Personal information</IonListHeader>
          <IonItem>
            <IonLabel position="stacked">First Name</IonLabel>
            <IonInput value={firstName} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Last Name</IonLabel>
            <IonInput value={lastName} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput value={userName} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput value={email} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Phone</IonLabel>
            <IonInput value={phone} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Address</IonLabel>
            <IonInput value={address} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}

export default UserListModal;
