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

import { isOpenAtom } from "atoms/usersWesternAllianceModal";
import FormCreatWesternAllianceBase from "components/FormCreateWesternAllianceBase/FormCreateWesternAllianceBase";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

export default function UsersWesternAllianceModal() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const { createAccount } = useWesternAllianceAccount();

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
        <FormCreatWesternAllianceBase
          createAccount={createAccount}
          isOpenAtom={isOpenAtom}
        />
      </IonContent>
    </IonModal>
  );
}
