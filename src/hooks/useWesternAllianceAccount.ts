import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuth from "hooks/useAuth";

export type StringMap = {
  [key: string]: string;
};

export type Account = {
  id: string;
  accountBalance: string;
  accountNumber: string;
  accountName: string;
  client: string;
  routingNumber: string;
};

export type AccountCreateInput = {
  accountBalance?: number;
  accountNumber: string;
  accountName: string;
  client: string;
};

type AccountUpdateInput = {
  id: string;
  accountBalance?: string;
  accountNumber?: string;
  accountName?: string;
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
  useIntermediary: boolean;
};

export type ExternalAccountCreateInput = {
  accountName: string;
  accountNumber: string;
  financialInstitution: string;
  intermediaryBankName?: string;
  intermediaryRoutingNumber?: string;
  intermediaryFurtherCreditTo?: string;
  routingNumber: string;
  useIntermediary: boolean;
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
  amount: string;
  externalAccount: string | null;
  externalToAccount: {
    id: string;
    accountName: string;
    accountNumber: string;
    financialInstitution: string;
    routingNumber: string;
    intermediaryBankName: string | null;
    intermediaryFurtherCreditTo: string | null;
    intermediaryRoutingNumber: string | null;
    useIntermediary: boolean;
  } | null;
  fromAccount: string;
  memo: string | null;
  status: string;
  submittedBy: string;
  toAccount: string | null;
  transactionNumber: string | null;
  transferDate: string;
  type: string;
  updatedBy: string | null;
  userSubmittedBy: {
    firstName: string;
    lastName: string;
  };
  userUpdatedBy: null | {
    firstName: string;
    lastName: string;
  };
  westernAllianceFromAccount: {
    accountNumber: string;
    accountName: string;
  };
  westernAllianceToAccount: null | {
    accountNumber: string;
    accountName: string;
  };
};

export type TransferTable = {
  id: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  status: string;
  transferDate: string;
};

export type TransferCreateInput = {
  amount: number;
  externalAccount?: string;
  fromAccount: string;
  memo?: string;
  toAccount?: string;
  transferDate: Date;
  type: string;
};

export type TransferUpdateInput = {
  id: string;
  status: string;
};

export const transactionTypeMap: StringMap = {
  C: "Deposit",
  D: "Withdrawal",
  F: "Float",
  M: "Miscellaneous Service Charge",
  X: "Reversed",
};

export const transferStatusMap: StringMap = {
  APPROVED: "Approved",
  COMPLETED: "Completed",
  REVIEWED: "Reviewed",
  REJECTED: "Rejected",
  SUBMITTED: "Submitted",
};

export const transferTypeMap: StringMap = {
  ACCOUNT: "Account",
  WIRE: "Wire",
};

const queryKey = "westernAlliance";
const accountQueryKey = `${queryKey}Account`;
const transferQueryKey = `${queryKey}Transfer`;
const externalAccountsQueryKey = `${queryKey}ExternalAccounts`;

export default function useWesternAllianceAccount() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    accountQueryKey,
    getAccounts,
  );

  const { isSuccess: transfersIsSuccess, data: transfers } = useQuery(
    transferQueryKey,
    getTransfers,
  );

  const { isSuccess: externalAccountsIsSuccess, data: externalAccounts } =
    useQuery(externalAccountsQueryKey, getWesternAllianceExternalAccounts);

  const { mutate: createAccount } = useMutation(createAccountMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(accountQueryKey);
    },
  });

  const { mutateAsync: createExternalAccount } = useMutation(
    createExternalAccountMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(externalAccountsQueryKey);
      },
    },
  );

  const { mutateAsync: createTransfer } = useMutation(createTransferMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(transferQueryKey);
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

  const { mutate: updateTransfer } = useMutation(updateTransferMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(transferQueryKey);
    },
  });

  async function getAccounts() {
    const { data } = await authApi.get<Account[]>("/western-alliance/accounts");
    data.sort((a, b) => a.accountName.localeCompare(b.accountName));
    return data;
  }

  async function getWesternAllianceExternalAccounts() {
    const { data } = await authApi.get<ExternalAccount[]>(
      "/western-alliance/external-accounts",
    );
    return data;
  }

  async function createTransferMutation(body: TransferCreateInput) {
    const { data } = await authApi.post<Transfer>(
      "/western-alliance/transfer",
      body,
    );
    return data;
  }

  async function createExternalAccountMutation(
    body: ExternalAccountCreateInput,
  ) {
    const { data } = await authApi.post<ExternalAccount>(
      "/western-alliance/external-account",
      body,
    );
    return data;
  }

  async function getTransfers() {
    const { data } = await authApi.get<Transfer[]>(
      "/western-alliance/transfers",
    );
    data.sort((t1, t2) => {
      const d1 = new Date(t1.transferDate);
      const d2 = new Date(t2.transferDate);
      return d2.getTime() - d1.getTime();
    });
    return data;
  }

  async function createAccountMutation(body: AccountCreateInput) {
    const { data } = await authApi.post<Account>(
      "/western-alliance/account",
      body,
    );
    return data;
  }

  async function deleteAccountMutation(id: string) {
    const { data } = await authApi.delete<Account>(
      `/western-alliance/account?id=${id}`,
    );
    return data;
  }

  async function updateAccountMutation(body: AccountUpdateInput) {
    const { data } = await authApi.patch<Account>(
      "/western-alliance/account",
      body,
    );
    return data;
  }

  async function updateTransferMutation(body: TransferUpdateInput) {
    const { data } = await authApi.patch<Transfer>(
      "/western-alliance/transfer",
      body,
    );
    return data;
  }

  return {
    accountQueryKey,
    accountsIsSuccess,
    accounts,
    createAccount,
    deleteAccount,
    transfers,
    transfersIsSuccess,
    updateAccount,
    updateTransfer,
    createTransfer,
    createExternalAccount,
    externalAccounts,
    externalAccountsIsSuccess,
  };
}
