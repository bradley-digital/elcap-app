import type {
  Account,
  ExternalAccount,
  Transfer,
  Transaction,
} from "hooks/useWesternAllianceAccount";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";

import { queryKey } from "hooks/useUser";

const mockTransferData: Transfer[] = [
  {
    id: "asdfap98sdfh",
    accountName: "El Capitan Advisor for Money Market Fund 8",
    accountNumber: "8996488782",
    amount: 100.00,
    memo: "First transfer",
    status: "Submitted",
    submittedBy: "Joshua Bradley",
    transactionNumber: "36546873543",
    transferDate: "2023-05-30T00:00:00.000Z",
    updatedBy: "Kate Gurske",
  },
  {
    id: "nfqasdfu",
    accountName: "El Capitan Advisor for Money Market Fund 8",
    accountNumber: "8996488782",
    amount: 2000.00,
    memo: "Second transfer",
    status: "Complete",
    submittedBy: "Joshua Bradley",
    transactionNumber: "36546873543",
    transferDate: "2023-05-20T00:00:00.000Z",
    updatedBy: "Kate Gurske",
  },
];

const mockExternalAccountData: ExternalAccount[] = [
  {
    id: "abcd",
    accountName: "Total Checking",
    accountNumber: "123456789",
    financialInstitution: "Bank of America",
    intermediaryBankName: "Bank of America",
    intermediaryRoutingNumber: "987654321",
    intermediaryFurtherCreditTo: "",
    routingNumber: "123409871",
  },
  {
    id: "abce",
    accountName: "Total Savings",
    accountNumber: "1234562345",
    financialInstitution: "Chase Bank",
    intermediaryBankName: "Chase Bank",
    intermediaryRoutingNumber: "987652349",
    intermediaryFurtherCreditTo: "",
    routingNumber: "123404345",
  },
];

async function getTransfers() {
  return {
    data: mockTransferData
  };
}

async function getExternalAccounts() {
  return {
    data: mockExternalAccountData,
  };
}

const westernAllianceAccountsQueryKey = `${queryKey}WesternAllianceAccounts`;
const westernAllianceExternalAccountsQueryKey = `${queryKey}WesternAllianceExternalAccounts`;
const westernAllianceTransactionsQueryKey = `${queryKey}WesternAllianceTransactions`;
const westernAllianceTransferQueryKey = `${queryKey}WesternAllianceTransfer`;

export default function useUserWesternAlliance() {
  const { authApi } = useAuth();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    westernAllianceAccountsQueryKey,
    getWesternAllianceAccounts
  );

  const { isSuccess: externalAccountsIsSuccess, data: externalAccounts } = useQuery(
    westernAllianceExternalAccountsQueryKey,
    getWesternAllianceExternalAccounts
  );

  const { isSuccess: transactionsIsSuccess, data: transactions } = useQuery(
    westernAllianceTransactionsQueryKey,
    getWesternAllianceTransactions
  );

  const { isSuccess: transfersIsSuccess, data: transfers } = useQuery(
    westernAllianceTransferQueryKey,
    getWesternAllianceTransfers
  );

  async function getWesternAllianceAccounts() {
    const { data } = await authApi.get<Account[]>(
      "/users/western-alliance/accounts"
    );
    data.sort((a, b) => a.accountTitle.localeCompare(b.accountTitle));
    return data;
  }

  async function getWesternAllianceExternalAccounts() {
    const { data } = await getExternalAccounts();
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

  async function getWesternAllianceTransfers() {
    const { data } = await getTransfers();
    return data;
  }

  return {
    accounts,
    accountsIsSuccess,
    externalAccounts,
    externalAccountsIsSuccess,
    transactions,
    transactionsIsSuccess,
    transfers,
    transfersIsSuccess,
  };
}
