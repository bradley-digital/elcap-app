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
import { isOpenAtom } from "atoms/westernAllianceModal";

import FormCreateWesternAlliance from "components/FormCreateWesternAlliance/FormCreateWesternAlliance";

export default function WesternAllianceListModal() {
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
          <IonTitle>New account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormCreateWesternAlliance />
      </IonContent>
    </IonModal>
  );
}
