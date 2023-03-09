import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";

import { queryKey } from "hooks/useUser";

const docfoxApplicationQueryKey = `${queryKey}DocfoxApplication`;
const docfoxTemplateQueryKey = `${queryKey}DocfoxTemplate`;

export default function useUserDocfox() {
  const { authApi } = useAuth();

  const { isSuccess: applicationIsSuccess, data: application } = useQuery(
    docfoxApplicationQueryKey,
    getDocfoxApplication
  );

  const { isSuccess: templateIsSuccess, data: template } = useQuery(
    docfoxTemplateQueryKey,
    getDocfoxTemplate
  );

  async function getDocfoxApplication() {
    const { data } = await authApi.get(
      "/users/docfox/application"
    );
    return data;
  }

  async function getDocfoxTemplate() {
    const { data } = await authApi.get(
      "/users/docfox/template"
    );
    return data;
  }

  return {
    application,
    applicationIsSuccess,
    template,
    templateIsSuccess,
  };
}
