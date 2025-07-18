import type { Profile } from "hooks/useUser";

// components
import {
  IonButton,
  IonItem,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";

// hooks
import useUserManagement from "hooks/useUserManagement";
import { useAtom } from "jotai";

// atoms
import { isOpenAtom } from "atoms/deleteUserModal";

type Props = {
  profile: Profile;
};

export default function UserAccountActions({ profile }: Props) {
  const [, setIsOpen] = useAtom(isOpenAtom);
  const { invite, update, disable } = useUserManagement();

  const { id, disabled } = profile;

  function handleInvite() {
    invite({ id });
  }

  function handleApprove() {
    update({ id, onboardingStage: "COMPLETE" });
  }

  function handleDelete() {
    setIsOpen(true);
  }

  function handleDisable() {
    disable({ userId: id, disabled: !disabled });
  }

  return (
    <div>
      <IonList>
        <IonListHeader>Profile actions</IonListHeader>
        <IonItem>
          <IonText>
            <h6>Invite user</h6>
            <p>
              Send the user an invitation email to create their password and
              accept their account.
            </p>
          </IonText>
          <IonButton onClick={handleInvite} slot="end" size="default">
            Invite user
          </IonButton>
        </IonItem>
        <IonItem>
          <IonText>
            <h6>Approve user</h6>
            <p>
              Confirm that the user has completed onboarding and is ready to use
              the application.
            </p>
          </IonText>
          <IonButton onClick={handleApprove} slot="end" size="default">
            Approve user
          </IonButton>
        </IonItem>
        <IonItem>
          <IonText>
            <h6>{disabled ? "Enable" : "Disable"} user</h6>
            <p>Freeze or unfreeze the user&apos;s account.</p>
          </IonText>
          <IonButton
            onClick={handleDisable}
            slot="end"
            size="default"
            color={disabled ? "primary" : "danger"}
          >
            {disabled ? "Enable" : "Disable"} user
          </IonButton>
        </IonItem>
        <IonItem>
          <IonText>
            <h6>Delete user</h6>
            <p>
              Once you delete a user there is no going back. Please be certain.
            </p>
          </IonText>
          <IonButton
            color="danger"
            onClick={handleDelete}
            slot="end"
            size="default"
          >
            Delete user
          </IonButton>
        </IonItem>
      </IonList>
    </div>
  );
}
