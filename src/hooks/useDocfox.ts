import { useQuery } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

const queryKey = "docfox";

export function useTemplates() {
  const { authApi } = useAuth();

  const {
    isSuccess: templatesIsSuccess,
    data: templates,
  } = useQuery(`${queryKey}Templates`, getEntityTemplates);

  async function getEntityTemplates() {
    const { data } = await authApi.get("/docfox/entity-templates");
    return data;
  }

  return {
    templatesIsSuccess,
    templates,
  };
}

export function useTemplate(templateId: string) {
  const { authApi } = useAuth();

  const {
    isSuccess: templateIsSuccess,
    data: template,
  } = useQuery(
    [`${queryKey}Template`, templateId],
    () => getEntityTemplate(templateId)
  );

  async function getEntityTemplate(id: string) {
    if (!id) return;
    const { data } = await authApi.get(`/docfox/entity-template?templateId=${id}`);
    return data;
  }

  return {
    templateIsSuccess,
    template,
  };
}
