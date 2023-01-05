export function removeUndefined(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => typeof v !== "undefined")
  );
}
