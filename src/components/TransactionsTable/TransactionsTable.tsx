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

import "./TransactionsTable.scss";

const columnHelper = createColumnHelper<Transaction>();

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
    cell: info => info.getValue(),
  }),
  // TODO: Account balance, not currently in dataset
];

export default function TransactionsTable() {
  const { transactions } = useUserWesternAllianceAccount();

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!transactions) {
    return null;
  }

  return (
    <div className="TransactionsTable">
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
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
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
