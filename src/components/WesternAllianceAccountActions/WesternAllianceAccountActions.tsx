import type { Account } from "hooks/useWesternAllianceAccount";
import { useIonRouter } from "@ionic/react";

// components
import { IonButton } from "@ionic/react";

// hooks
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

type Props = {
  account: Account;
};

export default function WesternAllianceAccountActions({ account }: Props) {
  const { deleteAccount } = useWesternAllianceAccount();
  const router = useIonRouter();

  const { id } = account;

  function handleDelete() {
    deleteAccount(id);
    router.push("/account-management");
  }

  return (
    <div>
      <IonButton color="danger" onClick={handleDelete}>
        Delete account
      </IonButton>
    </div>
  );
}
