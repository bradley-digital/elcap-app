import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "hooks/useWesternAllianceAccount";
import { transactionTypeMap } from "hooks/useWesternAllianceAccount";
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import "./TransactionsTable.scss";

const columnHelper = createColumnHelper<Transaction>();

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const columns = [
  columnHelper.accessor("postingDate", {
    header: () => "Date",
    cell: info => new Date(info.getValue()).toLocaleDateString("en-US"),
  }),
  columnHelper.accessor("transactionName", {
    header: () => "Description",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("transactionType", {
    header: () => "Type",
    cell: info => transactionTypeMap[info.getValue()] || "Unknown",
  }),
  columnHelper.accessor("transactionAmount", {
    header: () => "Amount",
    cell: info => USD.format(info.getValue()),
  }),
  // TODO: Account balance, not currently in dataset
];

export default function TransactionsTable() {
  const { accounts, transactions } = useUserWesternAllianceAccount();
  const [selectedAccountNumbers, setSelectedAccountNumbers] = useState([""]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Max");
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([""]);

  const accountNumbers = accounts?.map((account) => account.accountNumber) || [""];
  const timeRanges = ["YTD", "MTD", "3M", "1Y", "3Y", "5Y", "Max"];

  useEffect(() => {
    const transactionTypes = Object.keys(transactionTypeMap);
    setSelectedTransactionTypes(transactionTypes);
  }, []);

  useEffect(() => {
    setSelectedAccountNumbers(accountNumbers);
  }, [accounts]);

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

  function isInTransactionType(transaction: Transaction): boolean {
    return selectedTransactionTypes.includes(transaction.transactionType);
  }

  function isInAccountNumbers(transaction: Transaction): boolean {
    return selectedAccountNumbers.includes(transaction.accountNumber);
  }

  const filteredTransactions = useMemo(() => {
    return transactions?.sort((t1, t2) => {
      const d1 = new Date(t1.postingDate);
      const d2 = new Date(t2.postingDate);
      return d2.getTime() - d1.getTime();
    }).filter((transaction) => (
      isInDateRange(transaction) &&
      isInTransactionType(transaction) &&
      isInAccountNumbers(transaction)
    )) || [];
  }, [
    transactions,
    selectedAccountNumbers,
    selectedTimeRange,
    selectedTransactionTypes,
  ]);

  const table = useReactTable({
    data: filteredTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!transactions) {
    return null;
  }

  return (
    <div className="TransactionsTable">
      <IonList>
        <IonItem>
          <IonLabel>Accounts</IonLabel>
          <IonSelect
            placeholder="Select Account"
            onIonChange={(e) => setSelectedAccountNumbers(e.detail.value)}
            multiple={true}
            value={selectedAccountNumbers}
          >
            {accounts?.map((account) => (
              <IonSelectOption
                key={account.accountNumber}
                value={account.accountNumber}
              >
                {account.accountTitle}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Dates</IonLabel>
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
        <IonItem>
          <IonLabel>Transaction Type</IonLabel>
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
      </IonList>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
