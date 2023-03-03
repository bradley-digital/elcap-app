import { useMutation, useQuery } from "react-query";

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

export function useApplication() {
  const { authApi } = useAuth();

  const {
    isSuccess: applicationsIsSuccess,
    data: applications,
  } = useQuery(`${queryKey}Applications`, getApplications);

  const { mutate: postApplication } = useMutation(postApplicationMutation, {
    onSuccess: () => {
      // refetch list after update
      queryClient.invalidateQueries({ queryKey: `${queryKey}Applications` });
    },
  });

  async function getApplications() {
    const { data } = await authApi.get("/docfox/applications");
    return data;
  }

  async function postApplicationMutation(body: any) {
    const { data } = await authApi.post("/docfox/application");
    return data;
  }

  return {
    applicationsIsSuccess,
    applications,
    postApplication,
  };
}
