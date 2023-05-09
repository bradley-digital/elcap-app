import type { ColumnHelper } from "@tanstack/react-table";

type Data = {
  [key: string]: any;
};

function formatRows(rows: any[]) {
  return rows
    .map((row) =>
      row
        .map(String)
        .map((v) => v.replaceAll('"', '""'))
        .map((v) => v.trim())
        .map((v) => `"${v}"`)
        .join(",")
    )
    .join("\r\n");
}

export function createCSV(data: Data[], columns: ColumnHelper[]) {
  const headerRow = columns.map((c) => c.header());
  const rows = data.map((d) =>
    columns.map((c) => {
      const key = c.accessorKey;
      const value = d[key];
      if (value) {
        return value;
      }
    })
  );
  rows.unshift(headerRow);
  return formatRows(rows);
}

export function downloadBlob(
  content: string,
  filename: string,
  contentType: string
) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.click();
}

export function downloadCSV(content: string, filename: string) {
  downloadBlob(content, filename, "text/csv;charset=utf-8;");
}
