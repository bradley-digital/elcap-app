import { useQuery } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

export type Account = {
  id: string;
  accountNumber: string;
  accountTitle: string;
  client: string;
};

const queryKey = "westernAllianceAccount";

export default function useWesternAllianceAccount() {
  const { authApi } = useAuth();

  const {
    isSuccess: accountsIsSuccess,
    data: accounts
  } = useQuery(queryKey, getAccounts);

  async function getAccounts() {
    const { data } = await authApi.get<Account[]>("/western-alliance/accounts");
    return data;
  }

  return {
    queryKey,
    accountsIsSuccess,
    accounts,
  };
}
