import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import useAuth from "hooks/useAuth";
import { Profile } from "hooks/useUser";

type ProfileUpdateByIdInput = {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  role?: string;
};

type ProfileCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

const queryKey = "userList";

export default function useUser() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess, data } = useQuery(queryKey, getUserList);

  const { mutate: update } = useMutation(updateUser, {
    onSuccess: () => {
      // refetch list after update
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  const { mutate: create } = useMutation(createUser, {
    onSuccess: () => {
      // refetch list after update
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  async function getUserList() {
    const { data } = await authApi.get<Profile[]>("/users/list");
    return data;
  }

  async function updateUser(body: ProfileUpdateByIdInput) {
    console.log(body);
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
