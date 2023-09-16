import { useState } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { currency } from "lib/formats";
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

type CustomEvent = {
  detail: {
    value: string;
  };
};

const instructions = [
  { label: "ABA/Routing", value: "121143260" },
  { label: "Bank Name", value: "Bridge Bank, a Division of Western Alliance" },
  { label: "Bank Address", value: "55 Almaden Blvd, San Jose, CA 95113" },
  { label: "Account Name", value: "El Capitan Advisors, Inc" },
  {
    label: "Account Address",
    value: "1900 State Street, Suite J, Santa Barbara, CA 93101",
  },
  { label: "Account Number", value: "8707670828" },
];

export default function DepositInstructions() {
  const [account, setAccount] = useState("");
  const { accounts } = useUserWesternAllianceAccount();

  function handleChange(event: CustomEvent) {
    setAccount(event.detail.value);
  }

  const accountOptions =
    accounts
      ?.map(({ accountBalance, accountNumber, accountName }) => {
        const truncatedAccountNumber = accountNumber.slice(-4);
        const label = `${accountName} (...${truncatedAccountNumber}): ${currency(
          Number(accountBalance)
        )}`;
        return {
          value: accountNumber,
          label,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  return (
    <div className="DepositInstructions">
      <IonItem>
        <IonLabel position="stacked">Account</IonLabel>
        <IonSelect
          interfaceOptions={{ cssClass: "FormAccountSelect" }}
          onIonChange={handleChange}
          placeholder="Select account"
        >
          {accountOptions.map(({ value, label }) => (
            <IonSelectOption key={value} value={value}>
              {label}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonText>
        {instructions.map(({ label, value }) => (
          <p key={label}><strong>{label}:</strong> {value}</p>
        ))}
        <p><strong>Reference:</strong> {account || "(Select an account to view the reference number)"}</p>
      </IonText>
    </div>
  );
}
