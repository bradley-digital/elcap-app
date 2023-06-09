import type { Transfer } from "hooks/useWesternAllianceAccount";

import { useEffect, useMemo, useState } from "react";
import { chevronBack, chevronForward } from "ionicons/icons";

// lib
import { currency, date } from "lib/formats";

// hooks
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";
import { useAtom } from "jotai";

// atoms
import { idAtom, isOpenAtom } from "atoms/transferHistoryModal";

// components
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRippleEffect,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import "./TransferHistory.scss";

const columnHelper = createColumnHelper<Transfer>();

export default function TransferHistory() {
  const { transfers } = useUserWesternAllianceAccount();
  const [, setId] = useAtom(idAtom);
  const [, setIsOpen] = useAtom(isOpenAtom);
  const [selectedTimeRange, setSelectedTimeRange] = useState("YTD");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const timeRanges = ["YTD", "MTD", "3M", "1Y", "3Y", "5Y", "Max"];
  const statuses = transfers?.map(({ status }) => status) || [];

  useEffect(() => {
    setSelectedStatuses(statuses);
  }, [transfers]);

  const filteredTransfers = useMemo(() => {
    return (
      transfers
        ?.filter(
          (transfer) =>
            isInDateRange(transfer) &&
            isInStatuses(transfer)
        ) || []
    );
  }, [
    transfers,
    selectedStatuses,
    selectedTimeRange,
  ]);

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
          <a onClick={() => openModal(info.getValue())}>See details</a>
        ),
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => info.getValue(),
      }),
    ];
  }, []);

  const table = useReactTable({
    data: filteredTransfers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!transfers) return null;

  const statusOptions =
    statuses
      ?.map((status) => ({
        label: status,
        value: status,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  function openModal(id: string) {
    setId(id);
    setIsOpen(true);
  }

  function isInDateRange(transfer: Transfer) {
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

  function isInStatuses({ status }: Transfer): boolean {
    return selectedStatuses.includes(status);
  }

  return (
    <IonGrid className="TransferHistory">
      <IonRow className="ion-justify-content-center">
        <IonCol>
          <IonList className="TransferHistory__filters">
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
          <div className="TransferHistory__scroll--parent">
            <div className="TransferHistory__scroll--child">
              <table>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="TransferHistory__pagination">
            <button
              className="ion-activatable TransferHistory__button TransferHistory__back--all"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IonIcon icon={chevronBack} />
              <IonIcon icon={chevronBack} />
              <IonRippleEffect />
            </button>
            <button
              className="ion-activatable TransferHistory__button TransferHistory__back"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IonIcon icon={chevronBack} />
              <IonRippleEffect />
            </button>
            <button
              className="ion-activatable TransferHistory__button TransferHistory__forward"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IonIcon icon={chevronForward} />
              <IonRippleEffect />
            </button>
            <button
              className="ion-activatable TransferHistory__button TransferHistory__forward--all"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IonIcon icon={chevronForward} />
              <IonIcon icon={chevronForward} />
              <IonRippleEffect />
            </button>
            <div>
              <span>Page </span>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </div>
            <IonSelect
              className="TransferHistory__select"
              value={table.getState().pagination.pageSize}
              onIonChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <IonSelectOption key={pageSize} value={pageSize}>
                  Show {pageSize}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
