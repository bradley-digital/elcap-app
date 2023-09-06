import {
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import MultipleAccountsSelect, {
  Option,
} from "components/MultipleAccountsSelect/MultipleAccountsSelect";
import {
  Account,
  Transaction,
  transactionTypeMap,
} from "hooks/useWesternAllianceAccount";
import { download } from "ionicons/icons";
import { createCSV, downloadCSV } from "lib/csv";
import { transactions } from "pages/Pay/consts";
import { useState } from "react";

type Header = [keyof Transaction, string];
type Props = {
  selectedTransactionTypes: string[];
  setSelectedTransactionTypes: (value: string[]) => void;
  selectedTimeRange: string;
  setSelectedTimeRange: (value: string) => void;
  transactions: Transaction[];
  accounts?: Account[];
};
export default function Before({
  transactions,
  selectedTimeRange,
  selectedTransactionTypes,
  setSelectedTimeRange,
  setSelectedTransactionTypes,
  accounts,
}: Props) {
  
  const accountOptions =
    accounts
      ?.map((account) => {
        const truncatedAccountNumber = account.accountNumber.slice(-4);
        const label = `${account.accountName} (...${truncatedAccountNumber})`;
        return {
          value: account.accountNumber,
          label,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  accountOptions.unshift({
    label: "All accounts",
    value: "all",
  });

  const timeRanges = ["YTD", "MTD", "3M", "1Y", "3Y", "5Y", "Max"];

  function exportCSV() {
    // I don't like repeating information available in `columns`
    // but they typing for `columns` does not allow easy access to the data
    const headers: Header[] = [
      ["postingDate", "Date"],
      ["accountNumber", "Account"],
      ["fullTrailerRecord", "Description"],
      ["transactionType", "Type"],
      ["transactionAmount", "Amount"],
      ["accountBalance", "Balance"],
    ];
    const headerRow = headers.map((h) => h[1]);
    const rows = transactions.map((t) => headers.map((h) => t[h[0]]));
    rows.unshift(headerRow);
    const csv = createCSV(rows);
    const date = new Date();
    const iso = date.toISOString().replace(/:|\./g, "-");
    downloadCSV(csv, `elcap-transactions-${iso}.csv`);
  }

  return (
    <>
      <IonList className="Table__filters">
        <IonItem>
          <IonLabel position="stacked">Accounts</IonLabel>
          <MultipleAccountsSelect
            onChange={(e) => {
              // console.log({ value: e });
            }}
            options={accountOptions}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Transaction Type</IonLabel>
          <IonSelect
            placeholder="Select Transaction Types"
            onIonChange={(e) => setSelectedTransactionTypes(e.detail.value)}
            multiple={true}
            value={selectedTransactionTypes}
          >
            {Object.entries(transactionTypeMap).map(([key, value]) => (
              <IonSelectOption key={key} value={key}>
                {value}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Dates</IonLabel>
          <IonSelect
            placeholder="Select Date"
            onIonChange={(e) => setSelectedTimeRange(e.detail.value)}
            value={selectedTimeRange}
          >
            {timeRanges?.map((time) => (
              <IonSelectOption key={time} value={time}>
                {time}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
      <div className="Table__toolbar">
        <button
          className="ion-activatable Table__button Table__download"
          onClick={exportCSV}
        >
          <IonIcon icon={download} /> Export
        </button>
      </div>
    </>
  );
}
