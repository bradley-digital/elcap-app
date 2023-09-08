import type { Profile } from "hooks/useUser";
import { useEffect, useState } from "react";

// components
import { IonCheckbox, IonLabel, IonList, IonItem } from "@ionic/react";

// hooks
import useUserManagement from "hooks/useUserManagement";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

// styles
import "./FormUserWesternAllianceAccounts.scss";

type Props = {
  profile: Profile;
};

export default function FormUserWesternAllianceAccounts({ profile }: Props) {
  const [activeAccounts, setActiveAccounts] = useState<string[]>([]);

  const { accounts } = useWesternAllianceAccount();
  const { update } = useUserManagement();

  const { id, accounts: profileAccounts } = profile;

  useEffect(() => {
    const accountNumbers =
      profileAccounts?.map((account) => account.accountNumber) || [];
    setActiveAccounts(accountNumbers);
  }, [profileAccounts]);

  const accountOptions =
    accounts?.map((account) => {
      const truncatedAccountNumber = account.accountNumber.slice(-4);
      const label = `${account.accountName} (...${truncatedAccountNumber})`;
      return {
        value: account.accountNumber,
        label,
      };
    }) || [];

  function handleCheckbox(value: string) {
    const newActiveAccounts = [...activeAccounts];
    const index = newActiveAccounts.indexOf(value);
    if (index > -1) {
      newActiveAccounts.splice(index, 1);
    } else {
      newActiveAccounts.push(value);
    }
    setActiveAccounts(newActiveAccounts);
    update({ id, accounts: newActiveAccounts });
  }

  return (
    <IonList className="FormUserWesternAllianceAccounts">
      {accountOptions.map(({ label, value }) => (
        <IonItem key={value}>
          <IonCheckbox
            className="FormUserWesternAllianceAccounts__checkbox"
            checked={activeAccounts.includes(value)}
            onClick={() => handleCheckbox(value)}
          />
          <IonLabel>{label}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
