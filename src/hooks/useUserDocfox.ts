import type { DocfoxProfileDeleteInput } from "hooks/useDocfox";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuth from "hooks/useAuth";

import { queryKey } from "hooks/useUser";

const docfoxApplicationQueryKey = `${queryKey}DocfoxApplication`;
const docfoxTemplateQueryKey = `${queryKey}DocfoxTemplate`;

export default function useUserDocfox() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: applicationIsSuccess, data: application } = useQuery(
    docfoxApplicationQueryKey,
    getDocfoxApplication
  );

  const { isSuccess: templateIsSuccess, data: template } = useQuery(
    docfoxTemplateQueryKey,
    getDocfoxTemplate
  );

  const { mutateAsync: deleteProfileData } = useMutation(deleteProfileDataMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(docfoxApplicationQueryKey);
    },
  });

  const { mutateAsync: patchProfileData } = useMutation(patchProfileDataMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(docfoxApplicationQueryKey);
    },
  });

  const { mutateAsync: postProfileData } = useMutation(postProfileDataMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(docfoxApplicationQueryKey);
    },
  });

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

  async function deleteProfileDataMutation({ id, type }: DocfoxProfileDeleteInput) {
    const { data } = await authApi.delete(
      `/users/docfox/profile/data?id=${id}&type=${type}`
    );
    console.log(data);
    return data;
  }

  async function postProfileDataMutation(body: any) {
    const { data } = await authApi.post(
      "/users/docfox/profile/data",
      body
    );
    console.log(data);
    return data;
  }

  async function patchProfileDataMutation(body: any) {
    const { data } = await authApi.patch(
      "/users/docfox/profile/data",
      body
    );
    console.log(data);
    return data;
  }

  return {
    application,
    applicationIsSuccess,
    deleteProfileData,
    patchProfileData,
    postProfileData,
    template,
    templateIsSuccess,
  };
}
