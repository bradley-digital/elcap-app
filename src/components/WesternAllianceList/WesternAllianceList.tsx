import { useState } from "react";
import { IonItem, IonList, IonSearchbar } from "@ionic/react";
import { Account } from "hooks/useWesternAllianceAccount";
import "./WesternAllianceList.scss";

type Props = {
  accounts: Account[];
};

export default function WesternAllianceList({ accounts }: Props) {
  const [search, setSearch] = useState("");

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setSearch(target.value.toLowerCase());
    }
  }

  const filteredAccounts = accounts.filter((account: Account) => {
    const fullName =
      `${account.accountNumber} ${account.accountName}`.toLowerCase();
    return fullName.indexOf(search.toLowerCase()) > -1;
  });

  return (
    <div className="WesternAllianceList">
      <IonSearchbar debounce={400} onIonChange={handleSearch}></IonSearchbar>
      <IonList>
        {filteredAccounts.map(({ id, accountNumber, accountName }: Account) => (
          <IonItem
            key={id}
            className="WesternAllianceList__item"
            href={`/account-management/${id}`}
          >
            {`${accountName} (...${accountNumber.slice(-4)})`}
          </IonItem>
        ))}
      </IonList>
    </div>
  );
}
