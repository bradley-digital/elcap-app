import type { ReactNode } from "react";
import type { CoumnHelper } from "@tanstack/react-table";

type Props = {
  columns: ColumnHelper[];
  data: any;
  before: ReactNode;
  after: ReactNode;
};

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  IonCol,
  IonGrid,
  IonIcon,
  IonRippleEffect,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { chevronBack, chevronForward } from "ionicons/icons";

import "./Table.scss";

export default function Table({
  after = null,
  before = null,
  columns,
  data,
}: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <IonGrid className="Table">
      <IonRow className="ion-justify-content-center">
        <IonCol>
          {before}
          <div className="Table__scroll--parent">
            <div className="Table__scroll--child">
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
          <div className="Table__pagination">
            <button
              className="ion-activatable Table__button Table__back--all"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IonIcon icon={chevronBack} />
              <IonIcon icon={chevronBack} />
              <IonRippleEffect />
            </button>
            <button
              className="ion-activatable Table__button Table__back"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IonIcon icon={chevronBack} />
              <IonRippleEffect />
            </button>
            <button
              className="ion-activatable Table__button Table__forward"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IonIcon icon={chevronForward} />
              <IonRippleEffect />
            </button>
            <button
              className="ion-activatable Table__button Table__forward--all"
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
              className="Table__select"
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
          {after}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
