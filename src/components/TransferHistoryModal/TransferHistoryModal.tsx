// hooks
import { useAtom } from "jotai";

// atoms
import { idAtom, isOpenAtom } from "atoms/transferHistoryModal";

// components
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import TransferHistoryDetails from "components/TransferHistoryDetails/TransferHistoryDetails";

export default function UserListModal() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [, setId] = useAtom(idAtom);

  function closeModal() {
    setId("");
    setIsOpen(false);
  }

  return (
    <IonModal isOpen={isOpen} onWillDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transfer details</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closeModal}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TransferHistoryDetails />
      </IonContent>
    </IonModal>
  );
}
