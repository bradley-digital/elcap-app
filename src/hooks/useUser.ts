import type { Account } from "hooks/useWesternAllianceAccount";
import type { DocfoxApplication } from "hooks/useDocfox";
import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

type ProfileAccount = Pick<Account, "accountNumber" | "accountTitle">;

export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state?: string;
  role: string;
  createdAt: string;
  accounts?: ProfileAccount[];
  docfoxApplication: DocfoxApplication;
};

type ProfileUpdateInput = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  country?: string;
  state?: string;
};

export const queryKey = "userAccount";

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
    const { data } = await authApi.patch<Profile>("/users/update", body);
    return data;
  }

  return {
    queryKey,
    isSuccess,
    data,
    mutate,
  };
}
