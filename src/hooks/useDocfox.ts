import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

const queryKey = "docfox";

export function useTemplates() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

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
  if (!templateId) {
    return {
      templateIsSuccess: false,
      template: undefined,
    };
  }

  const {
    isSuccess: templateIsSuccess,
    data: template,
  } = useQuery(
    [`${queryKey}Template`, templateId],
    () => getEntityTemplate(templateId)
  );

  async function getEntityTemplate(id: string) {
    const { data } = await authApi.get(`/docfox/entity-template?templateId=${id}`);
    return data;
  }

  return {
    templateIsSuccess,
    template,
  };
}
