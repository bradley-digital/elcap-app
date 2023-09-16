import type { Profile } from "hooks/useUser";
import { useEffect, useState } from "react";

// components
import { IonCheckbox, IonLabel, IonList, IonItem, IonSearchbar } from "@ionic/react";

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

  const { accounts, setAccountsQuery } = useWesternAllianceAccount();
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

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setAccountsQuery(target.value.toLowerCase());
    }
  }

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
      <IonSearchbar debounce={400} onIonChange={handleSearch}></IonSearchbar>
      {accountOptions.map(({ label, value, selected }) => (
        <IonItem key={value}>
          <IonCheckbox
            className="FormUserWesternAllianceAccounts__checkbox"
            checked={selected}
            onClick={() => handleCheckbox(value)}
          />
          <IonLabel>{label}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
