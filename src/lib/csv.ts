export function createCSV(rows: any[]) {
  return rows.map((row) => row
    .map(String)
    .map((v: string) => v.replaceAll('"', '""'))
    .map((v: string) => v.trim())
    .map((v: string) => `"${v}"`)
    .join(",")
  ).join("\r\n");
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
