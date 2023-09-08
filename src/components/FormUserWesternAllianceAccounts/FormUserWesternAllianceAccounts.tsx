import type { Profile } from "hooks/useUser";
import { useEffect, useState } from "react";

// components
import { IonLabel, IonList, IonItem } from "@ionic/react";

// hooks
import useUserManagement from "hooks/useUserManagement";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

// styles
import "./FormUserWesternAllianceAccounts.scss";
import Checkbox from "components/Checkbox/Checkbox";

type Props = {
  profile: Profile;
};

export default function FormUserWesternAllianceAccounts({ profile }: Props) {
  const [activeAccounts, setActiveAccounts] = useState<string[]>([]);
  const { accounts } = useWesternAllianceAccount();
  const { update } = useUserManagement();

  const { id, accounts: profileAccounts, firstName, lastName } = profile;

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
        selected: activeAccounts.includes(account.accountNumber),
      };
    }) || [];

  accountOptions.sort((a, b) => {
    if (a.selected && !b.selected) {
      return -1;
    }
    if (!a.selected && b.selected) {
      return 1;
    }
    return 0;
  });

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
      {accountOptions.map(({ label, value, selected }) => (
        <IonItem key={value}>
          <Checkbox
            className="FormUserWesternAllianceAccounts__checkbox"
            checked={activeAccounts.includes(value)}
            onChange={() => {
              handleCheckbox(value);
            }}
            withWarning
            warningHeader={`You are about give ${firstName} ${lastName} access to ${label}.`}
            warningMessage="Are you sure this is correct?"
          />
          <IonLabel>{label}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
