import type { Profile } from "hooks/useUser";
import { useEffect, useMemo, useState } from "react";

// components
import { IonList, IonSearchbar } from "@ionic/react";

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
  const [accountOptions, setAccountOptions] = useState<
    { value: string; label: string; selected: boolean }[]
  >([]);
  const { accounts, setAccountsQuery } = useWesternAllianceAccount();
  const { update } = useUserManagement();

  const { id, accounts: profileAccounts, firstName, lastName } = profile;

  useEffect(() => {
    const accountNumbers =
      profileAccounts?.map((account) => account.accountNumber) || [];
    setActiveAccounts(accountNumbers);
  }, [profileAccounts]);

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

  useMemo(() => {
    if (
      !accounts ||
      accounts.length <= 0 ||
      !activeAccounts ||
      activeAccounts?.length <= 0
    )
      return;

    const options =
      accounts
        ?.map((account) => {
          const truncatedAccountNumber = account.accountNumber.slice(-4);
          const label = `${account.accountName} (...${truncatedAccountNumber})`;
          return {
            value: account.accountNumber,
            label,
            selected: activeAccounts.includes(account.accountNumber),
          };
        })
        .sort((a, b) => {
          if (a.selected && !b.selected) {
            return -1;
          }
          if (!a.selected && b.selected) {
            return 1;
          }
          return 0;
        }) || [];

    setAccountOptions(options);
  }, [accounts, activeAccounts]);

  return (
    <IonList className="FormUserWesternAllianceAccounts">
      <IonSearchbar debounce={400} onIonChange={handleSearch} />
      {accountOptions.map(({ label, value, selected }) => (
        <Checkbox
          key={value}
          className="FormUserWesternAllianceAccounts__checkbox"
          checked={selected}
          onChange={() => {
            handleCheckbox(value);
          }}
          label={label}
          warningHeader="Are you sure this is correct?"
          warningMessage={`You are about give ${firstName} ${lastName} access to ${label}.`}
        />
      ))}
    </IonList>
  );
}
