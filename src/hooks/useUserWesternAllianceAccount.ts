import type { Account, Transaction } from "./useWesternAllianceAccount";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";

import { queryKey } from "hooks/useUser";

const westernAllianceAccountsQueryKey = `${queryKey}WesternAllianceAccounts`;
const westernAllianceTransactionsQueryKey = `${queryKey}WesternAllianceTransactions`;

export default function useUserWesternAlliance() {
  const { authApi } = useAuth();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    westernAllianceAccountsQueryKey,
    getWesternAllianceAccounts
  );

  const { isSuccess: transactionsIsSuccess, data: transactions } = useQuery(
    westernAllianceTransactionsQueryKey,
    getWesternAllianceTransactions
  );

  async function getWesternAllianceAccounts() {
    const { data } = await authApi.get<{ accounts: Account[] }>(
      "/users/western-alliance-accounts"
    );
    return data;
  }

  async function getWesternAllianceTransactions() {
    const { data } = await authApi.get<Transaction[]>(
      "/users/western-alliance/transactions"
    );
    return data;
  }

  return {
    accounts,
    accountsIsSuccess,
    transactions,
    transactionsIsSuccess,
  };
}
