export function currency(amount: number) {
  const c = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return c.format(amount);
}

export function date(dateString: string, options?: Intl.DateTimeFormatOptions) {
  if (typeof dateString !== "string") return "";
  // UTC offset for PT is -08:00
  // https://en.wikipedia.org/wiki/List_of_UTC_offsets
  let offsetString = dateString;
  if (offsetString.includes("Z")) {
    offsetString = offsetString.replace("Z", "-08:00");
  }
  const d = new Date(offsetString);
  return d.toLocaleDateString("en-US", options);
}
