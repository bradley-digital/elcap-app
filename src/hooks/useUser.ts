import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

export type Profile = {
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password?: string;
  createdAt: string;
  phone: string;
  email: string;
  address: string;
  role?: string;
};

export type ProfileUpdateInput = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  phone?: string;
};

const queryKey = "userAccount";

export default function useUser() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess, data } = useQuery(queryKey, getUser);

  const { mutate } = useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  async function getUser() {
    const { data } = await authApi.get<Profile>("/users/account");
    return data;
  }

  async function updateUser(body: ProfileUpdateInput) {
    const { data } = await authApi.post<Profile>("/users/update", body);
    return data;
  }

  async function createUser(body: ProfileUpdateInput) {
    const { data } = await authApi.post<Profile>("/users/create", body);
    return data;
  }

  return {
    queryKey,
    isSuccess,
    data,
    mutate,
    createUser,
  };
}
