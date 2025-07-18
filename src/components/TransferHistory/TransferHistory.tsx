import type { TransferTable } from "hooks/useWesternAllianceAccount";

import { useEffect, useMemo, useState } from "react";

// lib
import { currency, date } from "lib/formats";

// hooks
import useUserWesternAllianceAccount, {
  portalTransferStatusMap,
} from "hooks/useUserWesternAllianceAccount";
import { createColumnHelper } from "@tanstack/react-table";

// components
import {
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import Table from "components/Table/Table";

const columnHelper = createColumnHelper<TransferTable>();

function mapStatus(status: string) {
  return portalTransferStatusMap[status] || "Unknown";
}

export default function TransferHistory() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("YTD");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const { transfers } = useUserWesternAllianceAccount();

  const timeRanges = ["YTD", "MTD", "3M", "1Y", "3Y", "5Y", "Max"];
  const mappedStatuses =
    transfers?.map(({ status }) => mapStatus(status)) || [];
  const statuses = [...new Set(mappedStatuses)];

  useEffect(() => {
    setSelectedStatuses(statuses);
  }, [transfers]);

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("transferDate", {
        header: () => "Transfer date",
        cell: (info) => date(info.getValue()),
      }),
      columnHelper.accessor("accountNumber", {
        header: () => "Account number",
        cell: (info) => `...${info.getValue().slice(-4)}`,
      }),
      columnHelper.accessor("accountName", {
        header: () => "Account name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("amount", {
        header: () => "Amount",
        cell: (info) => currency(Number(info.getValue())),
      }),
      columnHelper.accessor("id", {
        header: () => "Details",
        cell: (info) => (
          <a href={`/transfer/${info.getValue()}`}>See details</a>
        ),
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => info.getValue(),
      }),
    ];
  }, []);

  const filteredTransfers = useMemo(() => {
    return (
      transfers
        ?.map((transfer) => {
          return {
            id: transfer?.id,
            accountName: transfer?.westernAllianceFromAccount?.accountName,
            accountNumber: transfer?.westernAllianceFromAccount?.accountNumber,
            amount: transfer?.amount,
            status: mapStatus(transfer?.status),
            transferDate: transfer?.transferDate,
          };
        })
        ?.filter(
          (transfer) => isInDateRange(transfer) && isInStatuses(transfer),
        ) || []
    );
  }, [transfers, selectedStatuses, selectedTimeRange]);

  if (typeof transfers === "undefined") return null;

  const statusOptions =
    statuses
      ?.map((status) => ({
        label: status,
        value: status,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  function isInDateRange(transfer: TransferTable) {
    const date = new Date(transfer.transferDate);
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

  function isInStatuses({ status }: TransferTable): boolean {
    return selectedStatuses.includes(status);
  }

  const before = (
    <IonList className="Table__filters">
      <IonItem>
        <IonLabel position="stacked">Statuses</IonLabel>
        <IonSelect
          placeholder="Select Statuses"
          onIonChange={(e) => setSelectedStatuses(e.detail.value)}
          multiple={true}
          value={selectedStatuses}
        >
          {statusOptions?.map(({ label, value }) => (
            <IonSelectOption key={value} value={value}>
              {label}
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
  );

  return <Table before={before} columns={columns} data={filteredTransfers} />;
}
