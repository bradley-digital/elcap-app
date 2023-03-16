import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import { queryKey as userQueryKey } from "hooks/useUserManagement";
import useAuth from "hooks/useAuth";

export type DocfoxApplication = {
  id: string;
  applicationId: string;
  templateId: string;
};

export type DocfoxProfileDeleteInput = {
  id: string;
  type: string;
};

const queryKey = "docfox";
const applicationQueryKey = `${queryKey}Application`;
const applicationsQueryKey = `${queryKey}Applications`;
const invitationLinkQueryKey = `${queryKey}InvitationToken`;
const templateQueryKey = `${queryKey}Template`;
const templatesQueryKey = `${queryKey}Templates`;

export function useTemplates() {
  const { authApi } = useAuth();

  const { isSuccess: templatesIsSuccess, data: templates } = useQuery(
    templatesQueryKey,
    getEntityTemplates
  );

  async function getEntityTemplates() {
    const { data } = await authApi.get("/docfox/entity-templates");
    return data;
  }

  return {
    templates,
    templatesIsSuccess,
  };
}

export function useTemplate(templateId: string) {
  const { authApi } = useAuth();

  const { isSuccess: templateIsSuccess, data: template } = useQuery(
    [templateQueryKey, templateId],
    () => getEntityTemplate(templateId)
  );

  async function getEntityTemplate(templateId: string) {
    if (!templateId) return;
    const { data } = await authApi.get(
      `/docfox/entity-template?templateId=${templateId}`
    );
    return data;
  }

  return {
    template,
    templateIsSuccess,
  };
}

export function useApplications() {
  const { authApi } = useAuth();

  const { isSuccess: applicationsIsSuccess, data: applications } = useQuery(
    applicationsQueryKey,
    getApplications
  );

  async function getApplications() {
    const { data } = await authApi.get("/docfox/applications");
    return data;
  }

  return {
    applications,
    applicationsIsSuccess,
  };
}

export function useInvitationLink(contactId: string) {
  const { authApi } = useAuth();

  const { isSuccess: invitationLinkIsSuccess, data: invitationLink } = useQuery(
    [invitationLinkQueryKey, contactId],
    () => getInvitationLink(contactId)
  );

  async function getInvitationLink(contactId: string) {
    if (!contactId) return "";
    const { data } = await authApi.get(
      `/docfox/invitation-link?contactId=${contactId}`
    );
    return data?.invitationLink || "";
  }

  return {
    invitationLink,
    invitationLinkIsSuccess,
  };
}

export function useApplication(applicationId: string) {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: applicationIsSuccess, data: application } = useQuery(
    [applicationQueryKey, applicationId],
    () => getApplication(applicationId)
  );

  const { mutate: postApplication } = useMutation(postApplicationMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(userQueryKey);
      queryClient.invalidateQueries(applicationQueryKey);
    },
  });

  const { mutateAsync: deleteProfileData } = useMutation(
    deleteProfileDataMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(applicationQueryKey);
      },
    }
  );

  const { mutateAsync: patchProfileData } = useMutation(
    patchProfileDataMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(applicationQueryKey);
      },
    }
  );

  const { mutateAsync: postProfileData } = useMutation(
    postProfileDataMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(applicationQueryKey);
      },
    }
  );

  async function getApplication(applicationId: string) {
    if (!applicationId) return;
    const { data } = await authApi.get(
      `/docfox/application?applicationId=${applicationId}`
    );
    return data;
  }

  async function deleteProfileDataMutation({
    id,
    type,
  }: DocfoxProfileDeleteInput) {
    const { data } = await authApi.delete(
      `/docfox/profile/data?id=${id}&type=${type}`
    );
    return data;
  }

  async function patchProfileDataMutation(body: any) {
    const { data } = await authApi.patch("/docfox/profile/data", body);
    return data;
  }

  async function postApplicationMutation(body: any) {
    const { data } = await authApi.post("/docfox/application", body);
    return data;
  }

  async function postProfileDataMutation(body: any) {
    const { data } = await authApi.post("/docfox/profile/data", body);
    return data;
  }

  return {
    application,
    applicationIsSuccess,
    deleteProfileData,
    patchProfileData,
    postApplication,
    postProfileData,
  };
}
