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

export const queryKey = "userList";

export default function useUser() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess, data } = useQuery(queryKey, getUserList);

  const { mutate: update } = useMutation(updateUser, {
    onSuccess: () => {
      // refetch list after update
      queryClient.invalidateQueries(queryKey);
    },
  });

  const { mutate: create } = useMutation(createUser, {
    onSuccess: () => {
      // refetch list after update
      queryClient.invalidateQueries(queryKey);
    },
  });

  async function getUserList() {
    const { data } = await authApi.get<Profile[]>("/users/list");
    return data;
  }

  async function updateUser(body: ProfileUpdateByIdInput) {
    const { data } = await authApi.post<Profile>("/users/update-by-id", body);
    return data;
  }

  async function createUser(body: ProfileCreateInput) {
    const { data } = await authApi.post<Profile>("/users/create", body);
    return data;
  }

  return {
    queryKey,
    isSuccess,
    data,
    update,
    create,
  };
}
