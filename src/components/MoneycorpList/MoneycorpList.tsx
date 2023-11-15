import { IonItem, IonList, IonSearchbar } from "@ionic/react";
import "./MoneycorpList.scss";
import useMoneycorpAccount, {
  MoneycorpAccount,
} from "hooks/useMoneycorpAccount";
import { useState } from "react";

export default function MoneycorpList() {
  const { accounts } = useMoneycorpAccount();
  const [accountsQuery, setAccountsQuery] = useState<string>("");

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setAccountsQuery(target.value.toLowerCase());
    }
  }

  const filteredAccounts = accounts?.filter(({ attributes }) => {
    const { accountName, accountReference } = attributes;
    return (
      accountName.toLowerCase().includes(accountsQuery) ||
      accountReference.toLowerCase().includes(accountsQuery)
    );
  });

  return (
    <div className="WesternAllianceList">
      <IonSearchbar debounce={400} onIonChange={handleSearch}></IonSearchbar>
      <IonList>
        {filteredAccounts?.map(({ id, attributes }: MoneycorpAccount) => (
          <IonItem
            key={id}
            className="WesternAllianceList__item"
            href={`/account-management/moneycorp/${id}`}
          >
            {`${attributes.accountName} (...${attributes.accountReference})`}
          </IonItem>
        ))}
      </IonList>
    </div>
  );
}
