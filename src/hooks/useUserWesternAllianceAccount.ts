import type { Account, Transaction } from "./useWesternAllianceAccount";
import { useQuery } from "react-query";

const queryKey = "userAccount";

export default function useUser() {
  const {
    isSuccess: accountsIsSuccess,
    data: accounts
  } = useQuery(`${queryKey}WesternAllianceAccounts`, getWesternAllianceAccounts);

  const {
    isSuccess: transactionsIsSuccess,
    data: transactions
  } = useQuery(`${queryKey}WesternAllianceTransactions`, getWesternAllianceTransactions);

  async function getWesternAllianceAccounts() {
    const { data } = await authApi.get<Account[]>("/users/western-alliance-accounts");
    return data;
  }

  async function getWesternAllianceTransactions() {
    const { data } = await authApi.get<Transaction[]>("/users/western-alliance-transactions");
    return data;
  }

  return {
    accountsIsSuccess,
    accounts,
    transactionsIsSuccess,
    transactions,
  };
}
