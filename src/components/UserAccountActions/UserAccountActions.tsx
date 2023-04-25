import type { Profile } from "hooks/useUser";
import { useIonRouter } from "@ionic/react";

// components
import { IonButton, IonListHeader } from "@ionic/react";

// hooks
import useUserManagement from "hooks/useUserManagement";

type Props = {
  profile: Profile;
};

export default function UserAccountActions({ profile }: Props) {
  const { deleteUser, invite } = useUserManagement();
  const router = useIonRouter();

  const { id } = profile;

  function handleInvite() {
    invite({ id });
  }

  function handleDelete() {
    deleteUser(id);
    router.push("/user-management");
  }

  return (
    <div>
      <IonListHeader>Profile actions</IonListHeader>
      <IonButton onClick={handleInvite}>Invite user</IonButton>
      <IonButton color="danger" onClick={handleDelete}>
        Delete user
      </IonButton>
    </div>
  );
}
