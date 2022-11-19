export function removeUndefined(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => typeof v !== "undefined"));
}
