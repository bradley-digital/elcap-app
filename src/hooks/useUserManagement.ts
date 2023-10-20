import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import type { Profile } from "hooks/useUser";
import useAuth from "hooks/useAuth";

type ProfileUpdateByIdInput = {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  country?: string;
  state?: string;
  role?: string;
  onboardingStage?: string;
  accounts?: string[];
  applicationId?: string;
};

type ProfileCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  country: string;
  state?: string;
  role: string;
  accounts?: string[];
};

type ProfileInviteInput = {
  id: string;
};

export const queryKey = "userList";

export default function useUser() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess, data } = useQuery(queryKey, getUserList);

  const { mutate: disable } = useMutation(disableUser, {
    onSuccess: (data) => {
      const previousUsers = queryClient.getQueryData<Profile[]>(queryKey);
      if (!previousUsers) return;
      const index = previousUsers?.findIndex((user) => user.id === data.id);
      if (index === undefined || index === -1) return;
      const previousUser = previousUsers[index];
      previousUser.disabled = data.disabled;
      queryClient.setQueryData(queryKey, previousUsers);
    },
  });

  const { mutate: create } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const { mutate: deleteUser } = useMutation(deleteUserMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const { mutate: invite } = useMutation(inviteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const { mutate: update } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  async function disableUser(body: { userId: string; disabled: boolean }) {
    const { data } = await authApi.post<Profile>("/users/disable", body);
    return data;
  }

  async function createUser(body: ProfileCreateInput) {
    const { data } = await authApi.post<Profile>("/users/create", body);
    return data;
  }

  async function deleteUserMutation(id: string) {
    const { data } = await authApi.delete<Profile>(`/users?id=${id}`);
    return data;
  }

  async function inviteUser(body: ProfileInviteInput) {
    const { data } = await authApi.post<Profile>("/users/invite", body);
    return data;
  }

  async function getUserList() {
    const { data } = await authApi.get<Profile[]>("/users/list");
    data.sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
      ),
    );
    return data;
  }

  async function updateUser(body: ProfileUpdateByIdInput) {
    const { data } = await authApi.patch<Profile>("/users/update-by-id", body);
    return data;
  }

  return {
    create,
    data,
    deleteUser,
    invite,
    isSuccess,
    queryKey,
    update,
    disable,
  };
}
