import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

type StringMap = {
  [key: string]: string;
};

export default function useChartData(
  year: number,
  selectedTransactionType: string,
  selectedAccountNumber?: number
) {
  const { accounts, transactions } = useUserWesternAllianceAccount();

  if (!transactions) {
    return {
      isSuccess: false,
      data: undefined,
      options: undefined,
      currentBalance: undefined,
      transactionYears: undefined,
      transactionTypes: undefined,
      transactionTypeMap: undefined,
    };
  }

  // Still need to add this data to the accounts endpoint
  const currentBalance = 1479702.78;
  const transactionData: Array<number> = [];
  const chartLabels: Array<string> = [];
  const dataLabel =
    selectedTransactionType === "all" ? "Balance" : "Transactions";
  const transactionTypeMap: StringMap = {
    C: "Credit",
    D: "Debit",
    F: "Float",
    M: "Miscellaneous Service Charge",
    X: "Reversed",
  };

  const transactionsPerAccount = (accountNumber: string | number) => {
    return transactions?.filter(
      (transaction) => transaction.accountNumber === accountNumber
    );
  };

  const accountTransactions = selectedAccountNumber
    ? transactionsPerAccount(selectedAccountNumber)
    : transactions;

  accountTransactions.sort(
    (a, b) =>
      new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
  );

  const transactionYears = new Set(
    accountTransactions.map(({ postingDate }) =>
      new Date(postingDate).getFullYear()
    )
  );

  const transactionTypes = new Set(
    accountTransactions.map(({ transactionType }) => transactionType)
  );

  let balanceAtTimeOfTransaction = currentBalance;

  const transactionsWithBalance = accountTransactions
    .reverse()
    .map(({ transactionType, transactionAmount, postingDate }) => {
      const convertedTransactionAmount = Number(transactionAmount);

      // Round to avoid float precision errors
      const roundedBalance = Math.round(balanceAtTimeOfTransaction * 100) / 100;

      const transaction = {
        transactionAmount: convertedTransactionAmount,
        transactionType,
        postingDate,
        balanceAtTimeOfTransaction: roundedBalance,
      };

      switch (transactionType) {
        case "C":
          balanceAtTimeOfTransaction -= convertedTransactionAmount;
          break;
        case "D":
          balanceAtTimeOfTransaction += convertedTransactionAmount;
          break;
        case "F":
          balanceAtTimeOfTransaction -= convertedTransactionAmount;
          break;
        case "M":
          balanceAtTimeOfTransaction += convertedTransactionAmount;
          break;
        case "X":
          balanceAtTimeOfTransaction -= convertedTransactionAmount;
          break;
        default:
          break;
      }

      return transaction;
    })
    .reverse();

  const transactionsWithBalanceByYear = transactionsWithBalance.filter(
    (transaction) => {
      const date = new Date(transaction.postingDate);
      if (year === 0) {
        return date.getFullYear();
      } else {
        return date.getFullYear() === year;
      }
    }
  );

  transactionsWithBalanceByYear.forEach(
    ({ transactionAmount, transactionType, postingDate }) => {
      const filterMap: StringMap = {
        C: "C",
        D: "D",
        F: "F",
        M: "M",
        X: "X",
      };

      if (
        filterMap[selectedTransactionType] !== transactionType &&
        selectedTransactionType !== "all"
      ) {
        return;
      }

      const date = new Date(postingDate);
      const options: any = { month: "short", day: "numeric", year: "numeric" };
      const shortDate = date.toLocaleDateString("en-US", options);

      transactionData.push(transactionAmount);
      chartLabels.push(shortDate);
    }
  );
  const balanceData = transactionsWithBalanceByYear.map(
    (x) => x.balanceAtTimeOfTransaction
  );

  const chartData =
    selectedTransactionType === "all" ? balanceData : transactionData;

  chartLabels.sort(
    (a, b) => new Date(a).getFullYear() - new Date(b).getFullYear()
  );

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `${dataLabel}`,
        data: chartData,
        borderColor: "green",
        backgroundColor: "rgba(102, 204, 153, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Account Balance Timeline",
      },
    },
    tooltips: {
      enabled: true,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks",
        },
      },
      y: {
        title: {
          display: true,
          text: `${dataLabel}`,
        },
      },
    },
  };

  return {
    isSuccess: true,
    data,
    accounts,
    options,
    currentBalance,
    transactionYears,
    transactionTypes,
    transactionTypeMap,
  };
}
