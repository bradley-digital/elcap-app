import type { Account } from "hooks/useWesternAllianceAccount";
import type { DocfoxApplication } from "hooks/useDocfox";
import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

type ProfileAccount = Pick<Account, "accountNumber" | "accountName">;

export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isCannabis?: boolean;
  companyName?: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state?: string;
  role: string;
  onboardingStage: string;
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
  onboardingStage?: string;
};

export const queryKey = "userAccount";

export default function useUser() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: profileIsSuccess, data: profile } = useQuery(
    queryKey,
    getUser,
  );

  const { mutate: updateUser } = useMutation(updateUserMutation, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  async function getUser() {
    const { data } = await authApi.get<Profile>("/users/account");
    return data;
  }

  async function updateUserMutation(body: ProfileUpdateInput) {
    const { data } = await authApi.patch<Profile>("/users/update", body);
    return data;
  }

  return {
    userQueryKey: queryKey,
    profileIsSuccess,
    profile,
    updateUser,
  };
}
