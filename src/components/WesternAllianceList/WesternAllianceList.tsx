import { useState } from "react";
import { IonItem, IonList, IonSearchbar } from "@ionic/react";
import { Account } from "hooks/useWesternAllianceAccount";
import WesternAllianceListModal from "components/WesternAllianceListModal/WesternAllianceListModal";
import "./WesternAllianceList.scss";

type Props = {
  accounts: Account[];
};

export default function WesternAllianceList({ accounts }: Props) {
  const [search, setSearch] = useState<string>("");

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setSearch(target.value.toLowerCase());
    }
  }

  const filteredAccounts = accounts.filter((account: Account) => {
    const fullName = `${account.accountNumber} ${account.accountTitle}`.toLowerCase();
    return fullName.indexOf(search.toLowerCase()) > -1;
  });

  return (
    <>
      <IonSearchbar debounce={400} onIonChange={handleSearch}></IonSearchbar>
      <div className="WesternAllianceList">
        <IonList>
          {filteredAccounts.map((account: Account) => (
            <IonItem
              key={account.id}
              className="WesternAllianceList__item"
              href={`/western-alliance-management/${account.id}`}
            >
              {account.accountTitle} {account.accountNumber}
            </IonItem>
          ))}
        </IonList>
      </div>

      <WesternAllianceListModal />
    </>
  );
}
