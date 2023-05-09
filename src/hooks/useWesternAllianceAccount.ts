import { useQuery } from "react-query";

// hooks
import useAuth from "hooks/useAuth";

export type StringMap = {
  [key: string]: string;
};

export type Account = {
  id: string;
  accountNumber: string;
  accountBalance: string;
  accountTitle: string;
  client: string;
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

const queryKey = "westernAllianceAccount";

export const transactionTypeMap: StringMap = {
  C: "Withdrawl",
  D: "Deposit",
  F: "Float",
  M: "Miscellaneous Service Charge",
  X: "Reversed",
};

export default function useWesternAllianceAccount() {
  const { authApi } = useAuth();

  const { isSuccess: accountsIsSuccess, data: accounts } = useQuery(
    queryKey,
    getAccounts
  );

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
