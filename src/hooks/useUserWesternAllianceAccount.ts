import type {
  Account,
  ExternalAccount,
  ExternalAccountCreateInput,
  StringMap,
  Transfer,
  TransferCreateInput,
  Transaction,
} from "hooks/useWesternAllianceAccount";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuth from "hooks/useAuth";

import { queryKey } from "hooks/useUser";

export const portalTransferStatusMap: StringMap = {
  APPROVED: "Approved",
  COMPLETED: "Completed",
  REVIEWED: "Submitted",
  REJECTED: "Rejected",
  SUBMITTED: "Submitted",
};

const westernAllianceAccountsQueryKey = `${queryKey}WesternAllianceAccounts`;
const westernAllianceExternalAccountsQueryKey = `${queryKey}WesternAllianceExternalAccounts`;
const westernAllianceTransactionsQueryKey = `${queryKey}WesternAllianceTransactions`;
const westernAllianceTransferQueryKey = `${queryKey}WesternAllianceTransfer`;
const westernAllianceBackfilledTransactionsQueryKey = `${queryKey}WesternAllianceBackfilledTransactions`;

export default function useUserWesternAlliance(
  selectedTimeRange: string,
  sortBy?: string
) {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    westernAllianceAccountsQueryKey,
    getWesternAllianceAccounts
  );

  const { isSuccess: externalAccountsIsSuccess, data: externalAccounts } =
    useQuery(
      westernAllianceExternalAccountsQueryKey,
      getWesternAllianceExternalAccounts
    );

  const { isSuccess: transactionsIsSuccess, data: transactions } = useQuery(
    westernAllianceTransactionsQueryKey,
    getWesternAllianceTransactions
  );

  const {
    isSuccess: backfilledTransactionsIsSuccess,
    isFetching: backfilledTransactionsIsFetching,
    data: backfilledTransactions,
  } = useQuery(
    westernAllianceBackfilledTransactionsQueryKey,
    getWesternAllianceBackfilledTransactions
  );

  const { isSuccess: transfersIsSuccess, data: transfers } = useQuery(
    westernAllianceTransferQueryKey,
    getWesternAllianceTransfers
  );

  const { mutateAsync: createExternalAccount } = useMutation(
    createExternalAccountMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(westernAllianceExternalAccountsQueryKey);
      },
    }
  );

  const { mutateAsync: createTransfer } = useMutation(createTransferMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(westernAllianceTransferQueryKey);
    },
  });

  async function getWesternAllianceAccounts() {
    const { data } = await authApi.get<Account[]>(
      "/users/western-alliance/accounts"
    );
    data.sort((a, b) => a.accountName.localeCompare(b.accountName));
    return data;
  }

  async function getWesternAllianceExternalAccounts() {
    const { data } = await authApi.get<ExternalAccount[]>(
      "/users/western-alliance/external-accounts"
    );
    return data;
  }

  async function getWesternAllianceTransactions() {
    const { data } = await authApi.get<Transaction[]>(
      "/users/western-alliance/transactions"
    );
    data.sort((t1, t2) => {
      const d1 = new Date(t1.postingDate);
      const d2 = new Date(t2.postingDate);
      return d2.getTime() - d1.getTime();
    });
    return data;
  }

  async function getWesternAllianceBackfilledTransactions() {
    const { data } = await authApi.get<Transaction[]>(
      "/users/western-alliance/backfilled-transactions",
      {
        params: { selectedTimeRange: selectedTimeRange, sortBy: sortBy ?? "" },
      }
    );
    return data.sort((t1, t2) => {
      const d1 = new Date(t1.postingDate);
      const d2 = new Date(t2.postingDate);
      return d2.getTime() - d1.getTime();
    });
  }

  async function getWesternAllianceTransfers() {
    const { data } = await authApi.get<Transfer[]>(
      "/users/western-alliance/transfers"
    );
    return data;
  }

  async function createExternalAccountMutation(
    body: ExternalAccountCreateInput
  ) {
    const { data } = await authApi.post<ExternalAccount>(
      "/users/western-alliance/external-account",
      body
    );
    return data;
  }

  async function createTransferMutation(body: TransferCreateInput) {
    const { data } = await authApi.post<Transfer>(
      "/users/western-alliance/transfer",
      body
    );
    return data;
  }

  return {
    accounts,
    accountsIsSuccess,
    createExternalAccount,
    createTransfer,
    externalAccounts,
    externalAccountsIsSuccess,
    transactions,
    transactionsIsSuccess,
    backfilledTransactions,
    backfilledTransactionsIsFetching,
    backfilledTransactionsIsSuccess,
    getWesternAllianceBackfilledTransactions,
    transfers,
    transfersIsSuccess,
  };
}
