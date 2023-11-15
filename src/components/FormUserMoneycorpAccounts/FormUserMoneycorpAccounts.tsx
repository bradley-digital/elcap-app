import "./FormUserMoneycorpAccounts.scss";
import type { Profile } from "hooks/useUser";
import { FormEvent, useEffect, useMemo, useState } from "react";

// components
import { IonList, IonSearchbar } from "@ionic/react";
import Checkbox from "components/Checkbox/Checkbox";

// hooks
import useMoneycorpAccount from "hooks/useMoneycorpAccount";

type Props = {
  profile: Profile;
};

export default function FormUserMoneycorpAccount({ profile }: Props) {
  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [accountsQuery, setAccountsQuery] = useState<string>("");
  const [accountOptions, setAccountOptions] = useState<
    { value: string; label: string; selected: boolean; disabled: boolean }[]
  >([]);
  const { accounts, deleteAccount, createAccount } = useMoneycorpAccount();

  const { id: profileId, firstName, lastName, moneycorpAccount } = profile;

  useEffect(() => {
    if (!moneycorpAccount) return;
    setSelectedAccount(moneycorpAccount.accountId);
  }, [moneycorpAccount]);

  useMemo(() => {
    if (!accounts?.moneycorpAccounts?.length) return;
    const options =
      accounts?.moneycorpAccounts
        ?.map((account) => {
          const truncatedAccountNumber =
            account.attributes.accountReference.slice(-4);
          const label = `${account.attributes.accountName} (...${truncatedAccountNumber})`;
          return {
            value: account.id,
            label,
            selected: selectedAccount === account.id,
            disabled:
              accounts.linkedAccounts
                .map(({ accountId }) => accountId)
                .includes(account.id) && selectedAccount !== account.id,
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
  }, [accounts, selectedAccount, setAccountOptions]);

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setAccountsQuery(target.value.toLowerCase());
    }
  }

  async function handleCheckbox(
    checked: boolean | FormEvent<HTMLIonCheckboxElement>,
    value: string,
  ) {
    if (checked && !selectedAccount) {
      if (!moneycorpAccount) {
        createAccount({
          accountId: value,
          userId: profileId,
        });
        setSelectedAccount(value);
      }
    } else {
      deleteAccount(value);
      setSelectedAccount(undefined);
    }
  }

  useMemo(() => {
    const filteredAccounts =
      accounts?.moneycorpAccounts
        ?.filter(({ attributes }) => {
          const { accountName, accountReference } = attributes;
          return (
            accountName.toLowerCase().includes(accountsQuery) ||
            accountReference.toLowerCase().includes(accountsQuery)
          );
        })
        .map(({ id, attributes }) => {
          const truncatedAccountNumber = attributes.accountReference.slice(-4);
          const label = `${attributes.accountName} (...${truncatedAccountNumber})`;
          return {
            value: id,
            label,
            selected: selectedAccount === id,
            disabled:
              accounts.linkedAccounts
                .map(({ accountId }) => accountId)
                .includes(id) && selectedAccount !== id,
          };
        }) || [];

    setAccountOptions(filteredAccounts);
  }, [accountsQuery]);

  return (
    <IonList className="FormUserMoneycorpAccounts">
      <IonSearchbar debounce={400} onIonChange={handleSearch} />
      {accountOptions.map(({ label, value, selected, disabled }) => (
        <Checkbox
          key={value}
          className="FormUserMoneycorpAccounts__checkbox"
          checked={selected}
          disabled={disabled}
          onChange={(e) => {
            handleCheckbox(e, value);
          }}
          label={label}
          warningHeader="Are you sure this is correct?"
          warningMessage={`You are about give ${firstName} ${lastName} access to ${label}.`}
        />
      ))}
    </IonList>
  );
}
