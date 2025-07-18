import type { Transaction, StringMap } from "hooks/useWesternAllianceAccount";

type Header = [keyof Transaction, string];

import { useEffect, useMemo, useState } from "react";
import { download } from "ionicons/icons";

// lib
import { createCSV, downloadCSV } from "lib/csv";
import { currency, date } from "lib/formats";

// hooks
import { transactionTypeMap as originalTransactionTypeMap } from "hooks/useWesternAllianceAccount";
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";
import { createColumnHelper } from "@tanstack/react-table";

// components
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import Table from "components/Table/Table";
import MultiSelect from "components/MultiSelect/MultiSelect";

const transactionTypeMap: StringMap = {};
const wantedTypes = ["C", "D", "X"];
wantedTypes.forEach(
  (k) => (transactionTypeMap[k] = originalTransactionTypeMap[k]),
);

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor("postingDate", {
    header: () => "Date",
    cell: (info) => date(info.getValue()),
  }),
  columnHelper.accessor("accountNumber", {
    header: () => "Account",
    cell: (info) => `...${info.getValue().slice(-4)}`,
  }),
  columnHelper.accessor("fullTrailerRecord", {
    header: () => "Description",
    cell: (info) => (
      <div className="TransactionsTable__description">
        {info.getValue()?.trim() || "(No description)"}
      </div>
    ),
  }),
  columnHelper.accessor("transactionType", {
    header: () => "Type",
    cell: (info) => transactionTypeMap[info.getValue()] || "Unknown",
  }),
  columnHelper.accessor("transactionAmount", {
    header: () => "Amount",
    cell: (info) => currency(Number(info.getValue())),
  }),
  columnHelper.accessor("accountBalance", {
    header: () => "Balance",
    cell: (info) => currency(Number(info.getValue())),
  }),
];

export default function TransactionsTable() {
  const [selectedAccountNumbers, setSelectedAccountNumbers] = useState<
    string[]
  >([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("YTD");
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[]
  >([]);
  const { accounts, transactions } = useUserWesternAllianceAccount();

  const timeRanges = ["YTD", "MTD", "3M", "1Y", "3Y", "5Y", "Max"];
  const accountNumbers =
    accounts?.map(({ accountNumber }) => accountNumber) || [];

  useEffect(() => {
    const transactionTypes = Object.keys(transactionTypeMap);
    setSelectedTransactionTypes(transactionTypes);
  }, []);

  useEffect(() => {
    setSelectedAccountNumbers(accountNumbers);
  }, [accounts]);

  const filteredTransactions = useMemo(() => {
    return (
      transactions
        ?.filter(
          (transaction) =>
            isInDateRange(transaction) &&
            isInTransactionType(transaction) &&
            isInAccountNumbers(transaction),
        )
        .map((transaction) => {
          transaction.fullTrailerRecord =
            transaction.trailerRecord1
            " "
            transaction.trailerRecord2
            " "
            transaction.trailerRecord3
            " "
            transaction.trailerRecord4
            " "
            transaction.trailerRecord5
            " "
            transaction.trailerRecord6;
          return transaction;
        }) || []
    );
  }, [
    transactions,
    selectedAccountNumbers,
    selectedTimeRange,
    selectedTransactionTypes,
  ]);

  if (!transactions) return null;

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

  function isInDateRange(transaction: Transaction): boolean {
    const date = new Date(transaction.postingDate);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - date.getTime());
    const diffYears = timeDiff / (1000 * 3600 * 24 * 365);
    const diffMonths = diffYears * 12;

    switch (selectedTimeRange) {
      case "YTD":
        return date.getFullYear() === currentDate.getFullYear();
      case "MTD":
        return (
          date.getFullYear() === currentDate.getFullYear() &&
          date.getMonth() === currentDate.getMonth()
        );
      case "3M":
        return diffMonths <= 3;
      case "1Y":
        return diffYears <= 1;
      case "3Y":
        return diffYears <= 3;
      case "5Y":
        return diffYears <= 5;
      case "Max":
        return true;
      default:
        return true;
    }
  }

  function isInTransactionType({ transactionType }: Transaction): boolean {
    return selectedTransactionTypes.includes(transactionType);
  }

  function isInAccountNumbers({ accountNumber }: Transaction): boolean {
    return selectedAccountNumbers.includes(accountNumber);
  }

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
    const rows = filteredTransactions.map((t) => headers.map((h) => t[h[0]]));
    rows.unshift(headerRow);
    const csv = createCSV(rows);
    const date = new Date();
    const iso = date.toISOString().replace(/:|\./g, "-");
    downloadCSV(csv, `elcap-transactions-${iso}.csv`);
  }

  const before = (
    <>
      <IonList className="Table__filters">
        <MultiSelect
          onChange={(options) => {
            setSelectedAccountNumbers(options.map((option) => option.value));
          }}
          options={accountOptions}
          modalTitle="Accounts"
          label="Accounts"
        />
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

  return (
    <Table before={before} columns={columns} data={filteredTransactions} />
  );
}
