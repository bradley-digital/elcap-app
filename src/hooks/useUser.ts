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
  otpAuthUrl: string;
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
export const recoveryCodesqueryKey = `${queryKey}RecoveryCodes`;

export default function useUser() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: profileIsSuccess, data: profile } = useQuery(
    queryKey,
    getUser,
  );

  const { isSuccess: recoveryCodesIsSuccess, data: hasRecoveryCodes } =
    useQuery(recoveryCodesqueryKey, getHasRecoveryCodes);

  const { mutate: updateUser } = useMutation(updateUserMutation, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  const {
    mutate: generateNewRecoveryCodes,
    data: recoveryCodes,
    isLoading: generatingNewRecoveryCodes,
    status: generatingNewRecoveryCodesStatus,
    mutateAsync: asyncGenerateNewRecoveryCodes,
    isSuccess: generatingNewRecoveryCodesIsSuccess,
  } = useMutation(generateNewRecoveryCodesMutation);

  const { mutateAsync: verifyOtp } = useMutation(verifyOtpMutation);

  async function getUser() {
    const { data } = await authApi.get<Profile>("/users/account");
    return data;
  }

  async function getHasRecoveryCodes() {
    const { data } = await authApi.get<string[]>("/users/has-recovery-codes");
    return data;
  }

  async function updateUserMutation(body: ProfileUpdateInput) {
    const { data } = await authApi.patch<Profile>("/users/update", body);
    return data;
  }

  async function generateNewRecoveryCodesMutation() {
    const { data } = await authApi.post<string[]>("/users/recovery-codes");
    return data;
  }

  async function verifyOtpMutation(body: { otp: string }) {
    const { data } = await authApi.post<{ validOtp: boolean }>(
      "/users/verify-otp",
      body,
    );
    return data;
  }

  return {
    userQueryKey: queryKey,
    profileIsSuccess,
    profile,
    updateUser,
    recoveryCodesIsSuccess,
    hasRecoveryCodes,
    verifyOtp,
    recoveryCodes,
    generateNewRecoveryCodes,
    generatingNewRecoveryCodes,
    generatingNewRecoveryCodesStatus,
    asyncGenerateNewRecoveryCodes,
    generatingNewRecoveryCodesIsSuccess,
  };
}
