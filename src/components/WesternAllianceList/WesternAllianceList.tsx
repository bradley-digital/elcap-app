import { IonItem, IonList, IonSearchbar } from "@ionic/react";
import useWesternAllianceAccount, {
  Account,
} from "hooks/useWesternAllianceAccount";
import "./WesternAllianceList.scss";

export default function WesternAllianceList() {
  const { accounts, setAccountsQuery } = useWesternAllianceAccount();

  function handleSearch(e: Event) {
    const target = e.target as HTMLIonSearchbarElement;
    if (target && typeof target.value === "string") {
      setAccountsQuery(target.value.toLowerCase());
    }
  }

  return (
    <div className="WesternAllianceList">
      <IonSearchbar debounce={400} onIonChange={handleSearch}></IonSearchbar>
      <IonList>
        {accounts?.map(({ id, accountNumber, accountName }: Account) => (
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
