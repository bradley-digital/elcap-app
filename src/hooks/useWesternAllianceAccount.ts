import { useMutation, useQuery, useQueryClient } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

export type StringMap = {
  [key: string]: string;
};

export type Account = {
  id: string;
  accountBalance: number;
  accountNumber: string;
  accountTitle: string;
  client: string;
};

type AccountCreateInput = {
  accountBalance?: number;
  accountNumber: string;
  accountTitle: string;
  client: string;
};

type AccountUpdateInput = {
  id: string;
  accountBalance?: number;
  accountNumber?: string;
  accountTitle?: string;
  client?: string;
};

export type ExternalAccount = {
  id: string;
  accountName: string;
  accountNumber: string;
  financialInstitution: string;
  intermediaryBankName?: string;
  intermediaryRoutingNumber?: string;
  intermediaryFurtherCreditTo?: string;
  routingNumber: string;
};

export type Transaction = {
  id: string;
  accountNumber: string;
  accountBalance: string;
  backdatedTransactionEffectiveDate: string;
  companyId: string;
  floatDay1: number;
  floatDay1Amount: number;
  floatDay2: number;
  floatDay2Amount: number;
  floatDay3: number;
  floatDay3Amount: number;
  floatDay4: number;
  floatDay4Amount: number;
  floatDay5: number;
  floatDay5Amount: number;
  floatDay6: number;
  floatDay6Amount: number;
  floatDay7: number;
  floatDay7Amount: number;
  floatDay8: number;
  floatDay8Amount: number;
  floatDay9: number;
  floatDay9Amount: number;
  floatDay10: number;
  floatDay10Amount: number;
  floatDay11: number;
  floatDay11Amount: number;
  floatDay12: number;
  floatDay12Amount: number;
  fullTrailerRecord?: string;
  hashId: string;
  individualId: string;
  internalTransactionCode: number;
  isBackdated: boolean;
  isForcePosted: boolean;
  isListPost: boolean;
  isReturned: boolean;
  originalTransactionCode: string;
  payeeName: string;
  postingDate: string;
  trailerRecord: string;
  trailerRecord1: string;
  trailerRecord2: string;
  trailerRecord3: string;
  trailerRecord4: string;
  trailerRecord5: string;
  trailerRecord6: string;
  transactionAmount: string;
  transactionCode: number;
  transactionControlNumber: string;
  transactionIsReversed: boolean;
  transactionName: string;
  transactionSerialNumber: number;
  transactionSourceId: string;
  transactionSourceCode: number;
  transactionType: string;
};

export type Transfer = {
  id: string;
  accountName: string;
  accountNumber: string;
  amount: number;
  memo: string;
  status: string;
  submittedBy: string;
  transactionNumber: string;
  transferDate: string;
  updatedBy: string;
};

const accountQueryKey = "westernAllianceAccount";

export const transactionTypeMap: StringMap = {
  C: "Deposit",
  D: "Withdrawal",
  F: "Float",
  M: "Miscellaneous Service Charge",
  X: "Reversed",
};

export default function useWesternAllianceAccount() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    accountQueryKey,
    getAccounts
  );

  const { mutate: createAccount } = useMutation(createAccountMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(accountQueryKey);
    },
  });

  const { mutate: deleteAccount } = useMutation(deleteAccountMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(accountQueryKey);
    },
  });

  const { mutate: updateAccount } = useMutation(updateAccountMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(accountQueryKey);
    },
  });

  async function getAccounts() {
    const { data } = await authApi.get<Account[]>("/western-alliance/accounts");
    data.sort((a, b) => a.accountTitle.localeCompare(b.accountTitle));
    return data;
  }

  async function createAccountMutation(body: AccountCreateInput) {
    const { data } = await authApi.post<Account>(
      "/western-alliance/account",
      body
    );
    return data;
  }

  async function deleteAccountMutation(id: string) {
    const { data } = await authApi.delete<Account>(
      `/western-alliance/account?id=${id}`
    );
    return data;
  }

  async function updateAccountMutation(body: AccountUpdateInput) {
    const { data } = await authApi.patch<Account>(
      "/western-alliance/account",
      body
    );
    return data;
  }

  return {
    accountQueryKey,
    accountsIsSuccess,
    accounts,
    createAccount,
    deleteAccount,
    updateAccount,
  };
}
