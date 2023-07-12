import { useMemo } from "react";
import { useLocation, useParams } from "react-router";

export function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
