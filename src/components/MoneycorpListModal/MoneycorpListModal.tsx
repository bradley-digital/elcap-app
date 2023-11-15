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
import { isOpenAtom } from "atoms/moneycorpModal";

import FormCreateMoneycorp from "components/FormCreateMoneycorp/FormCreateMoneycorp";

export default function MoneycorpListModal() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <IonModal isOpen={isOpen} onWillDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New account</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closeModal}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormCreateMoneycorp />
      </IonContent>
    </IonModal>
  );
}
