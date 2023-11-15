import type { Account } from "hooks/useWesternAllianceAccount";
import type { DocfoxApplication } from "hooks/useDocfox";
import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import useAuth from "hooks/useAuth";
import { useIonToast } from "@ionic/react";
import { get } from "lodash";

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
  disabled: boolean;
  moneycorpAccount?: {
    id: string;
    accountId: string;
    userId: string;
  };
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
export const hasRecoveryCodesqueryKey = `${queryKey}RecoveryCodes`;

export default function useUser() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();
  const [showToast] = useIonToast();

  const { isSuccess: profileIsSuccess, data: profile } = useQuery(
    queryKey,
    getUser,
  );

  const { isSuccess: recoveryCodesIsSuccess, data: hasRecoveryCodes } =
    useQuery(hasRecoveryCodesqueryKey, getHasRecoveryCodes);

  const { mutate: updateUser } = useMutation(updateUserMutation, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  const {
    mutate: generateNewRecoveryCodes,
    data: recoveryCodes,
    status: generatingNewRecoveryCodesStatus,
    isSuccess: generatingNewRecoveryCodesIsSuccess,
  } = useMutation(generateNewRecoveryCodesMutation, {
    onSuccess: () => {
      queryClient.setQueryData(hasRecoveryCodesqueryKey, true);
    },
  });

  const { mutateAsync: verifyOtp } = useMutation(verifyOtpMutation);

  const { mutate: updatePassword, mutateAsync: asyncUpdatePassword } =
    useMutation(updatePasswordMutation, {
      onSuccess: () => {
        showToast({
          message: "Password updated",
          duration: 3000,
          color: "success",
        });
      },
      onError(error: unknown) {
        showToast({
          message: get(error, "message"),
          duration: 8 * 1000,
          position: "bottom",
          color: "danger",
        });
      },
    });

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

  async function updatePasswordMutation(body: {
    newPassword: string;
    currentPassword: string;
  }) {
    const { data } = await authApi.patch<Profile>("/users/password", body);
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
    profile,
    profileIsSuccess,
    recoveryCodes,
    recoveryCodesIsSuccess,
    hasRecoveryCodes,
    generateNewRecoveryCodes,
    generatingNewRecoveryCodesStatus,
    generatingNewRecoveryCodesIsSuccess,
    verifyOtp,
    updateUser,
    updatePassword,
    asyncUpdatePassword,
  };
}
