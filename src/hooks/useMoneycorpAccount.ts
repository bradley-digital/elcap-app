import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuth from "hooks/useAuth";

export type MoneycorpAccount = {
  id: string;
  type: string;
  attributes: {
    crmAccountGuid: string;
    accountName: string;
    parentAccountId: number;
    address: {
      addressLine1: string;
      addressLine2: string;
      addressLine3: string;
      city: string;
      stateProvince: string;
      postZipCode: string;
      country: string;
    };
    accountReference: string;
    accountIban: string;
    authorisationStatus: number;
    externalAccountReference: string;
  };
};

export type MoneycorpLinkedAccount = {
  id: string;
  userId?: string;
  accountId: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
};

type AccountCreateInput = {
  userId: string;
  accountId: string;
};

const queryKey = "moneycorp";
const accountQueryKey = `${queryKey}Account`;

export default function useMoneycorpAccount() {
  const { authApi } = useAuth();
  const queryClient = useQueryClient();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    accountQueryKey,
    () => getAccounts(),
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

  async function getAccounts() {
    const { data } = await authApi.get<{
      moneycorpAccounts: MoneycorpAccount[];
      linkedAccounts: MoneycorpLinkedAccount[];
    }>(`/moneycorp/accounts`);
    return data;
  }

  async function createAccountMutation(body: AccountCreateInput) {
    const { data } = await authApi.post<MoneycorpAccount>(
      "/moneycorp/account",
      body,
    );
    return data;
  }

  async function deleteAccountMutation(id: string) {
    const { data } = await authApi.delete<MoneycorpAccount>(
      `/moneycorp/account/${id}`,
    );
    return data;
  }

  return {
    accountQueryKey,
    accountsIsSuccess,
    accounts,
    createAccount,
    deleteAccount,
  };
}
