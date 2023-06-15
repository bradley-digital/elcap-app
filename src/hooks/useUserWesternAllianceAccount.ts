import type { Account, Transaction } from "hooks/useWesternAllianceAccount";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";

import { queryKey } from "hooks/useUser";

const westernAllianceAccountsQueryKey = `${queryKey}WesternAllianceAccounts`;
const westernAllianceTransactionsQueryKey = `${queryKey}WesternAllianceTransactions`;
const westernAllianceBackfilledTransactionsQueryKey = `${queryKey}WesternAllianceBackfilledTransactions`;

export default function useUserWesternAlliance(selectedTimeRange: string) {
  const { authApi } = useAuth();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    westernAllianceAccountsQueryKey,
    getWesternAllianceAccounts
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

  async function getWesternAllianceAccounts() {
    const { data } = await authApi.get<Account[]>(
      "/users/western-alliance/accounts"
    );
    data.sort((a, b) => a.accountTitle.localeCompare(b.accountTitle));
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
      { params: { selectedTimeRange: selectedTimeRange } }
    );
    data.sort((t1, t2) => {
      const d1 = new Date(t1.postingDate);
      const d2 = new Date(t2.postingDate);
      return d2.getTime() - d1.getTime();
    });
    return data;
  }

  return {
    accounts,
    accountsIsSuccess,
    transactions,
    transactionsIsSuccess,
    backfilledTransactions,
    backfilledTransactionsIsFetching,
    backfilledTransactionsIsSuccess,
    getWesternAllianceBackfilledTransactions,
  };
}
