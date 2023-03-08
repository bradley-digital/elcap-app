import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import { queryKey as userQueryKey } from "hooks/useUserManagement";
import useAuth from "hooks/useAuth";

export type DocfoxApplication = {
  id: string;
  applicationId: string;
  templateId: string;
};

const queryKey = "docfox";
const templateQueryKey = `${queryKey}Template`;
const templatesQueryKey = `${queryKey}Templates`;
const applicationQueryKey = `${queryKey}Application`;
const applicationsQueryKey = `${queryKey}Applications`;

export function useTemplates() {
  const { authApi } = useAuth();

  const {
    isSuccess: templatesIsSuccess,
    data: templates,
  } = useQuery(templatesQueryKey, getEntityTemplates);

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
    [templateQueryKey, templateId],
    () => getEntityTemplate(templateId)
  );

  async function getEntityTemplate(templateId: string) {
    if (!templateId) return;
    const { data } = await authApi.get(`/docfox/entity-template?templateId=${templateId}`);
    return data;
  }

  return {
    templateIsSuccess,
    template,
  };
}

export function useApplications() {
  const { authApi } = useAuth();

  const {
    isSuccess: applicationsIsSuccess,
    data: applications,
  } = useQuery(applicationsQueryKey, getApplications);

  async function getApplications() {
    const { data } = await authApi.get("/docfox/applications");
    return data;
  }

  return {
    applicationsIsSuccess,
    applications,
  };
}

export function useApplication(applicationId: string) {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const {
    isSuccess: applicationIsSuccess,
    data: application,
  } = useQuery(
    [applicationQueryKey, applicationId],
    () => getApplication(applicationId)
  );

  const { mutate: postApplication } = useMutation(postApplicationMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(userQueryKey);
      queryClient.invalidateQueries(applicationQueryKey);
    },
  });

  async function getApplication(applicationId: string) {
    if (!applicationId) return;
    const { data } = await authApi.get(`/docfox/application?applicationId=${applicationId}`);
    return data;
  }

  async function postApplicationMutation(body: any) {
    const { data } = await authApi.post("/docfox/application", body);
    return data;
  }

  return {
    applicationIsSuccess,
    application,
    postApplication,
  };
}
