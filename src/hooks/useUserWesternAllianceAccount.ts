import type { Account, Transaction } from "./useWesternAllianceAccount";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";

const queryKey = "userAccount";

export default function useUser() {
  const { authApi } = useAuth();
  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    `${queryKey}WesternAllianceAccounts`,
    getWesternAllianceAccounts
  );

  const { isSuccess: transactionsIsSuccess, data: transactions } = useQuery(
    `${queryKey}WesternAllianceTransactions`,
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
      "/users/western-alliance-transactions"
    );
    return data;
  }

  return {
    accountsIsSuccess,
    accounts,
    transactionsIsSuccess,
    transactions,
  };
}
