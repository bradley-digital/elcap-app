import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

type StringMap = {
  [key: string]: string;
};

type transactionMap = {
  transactionAmount: number;
  transactionType: string;
  postingDate: string;
  balanceAtTimeOfTransaction: number;
};

export default function useChartData(
  year: number,
  selectedTransactionType: string,
  selectedAccountNumber: number
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
  const dataLabel =
    selectedTransactionType === "all" ? "Balance" : "Transactions";
  const transactionTypeMap: StringMap = {
    C: "Credit",
    D: "Debit",
    F: "Float",
    M: "Miscellaneous Service Charge",
    X: "Reversed",
  };

  const filteredAccountTransactions = (accountNumber: string | number) => {
    return transactions?.filter(
      (transaction) => transaction.accountNumber === accountNumber
    );
  };

  const individualAccounts: any = [];
  accounts?.accounts.forEach((account: any) => {
    individualAccounts.push({
      accountTitle: account.accountTitle,
      accountNumber: account.accountNumber,
      transactions: filteredAccountTransactions(account.accountNumber),
    });
  });

  const selectedIndividualAccount =
    selectedAccountNumber !== 0
      ? individualAccounts.filter(
          (account: any) => account.accountNumber === selectedAccountNumber
        )
      : individualAccounts;

  const selectedAccountTransactions =
    selectedAccountNumber !== 0
      ? filteredAccountTransactions(selectedAccountNumber)
      : transactions;

  function createChartData(accountTransactions) {
    const chartLabels: Array<string> = [];
    const transactionData: Array<number> = [];

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
        const roundedBalance =
          Math.round(balanceAtTimeOfTransaction * 100) / 100;

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
      (transaction: transactionMap) => {
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
        const options: any = {
          month: "short",
          day: "numeric",
          year: "numeric",
        };
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

    return [
      chartData,
      chartLabels,
      transactionYears,
      transactionTypes,
      transactionData,
    ];
  }

  const colorArray = [
    "#007854",
    "#3dc2ff",
    "#5260ff",
    "#2dd36f",
    "#ffc409",
    "#eb445a",
  ];

  const chartData: string[] = createChartData(
    individualAccounts[0].transactions
  )[0];

  const chartLabels: string[] = createChartData(selectedAccountTransactions)[1];

  const transactionYears: string[] = createChartData(
    selectedAccountTransactions
  )[2];

  const transactionTypes: string[] = createChartData(
    selectedAccountTransactions
  )[3];

  const transactionData: string[] = createChartData(
    selectedAccountTransactions
  )[4];

  const data = {
    labels: chartLabels,
    datasets: selectedIndividualAccount.map((account: any, index: number) => {
      return {
        label: account.accountTitle,
        data:
          selectedTransactionType === "all"
            ? createChartData(account.transactions)[0]
            : createChartData(account.transactions)[4],
        // borderColor: "green",
        borderColor: colorArray[index],
        // backgroundColor: "rgba(102, 204, 153, 0.5)",
        backgroundColor: colorArray[index],
        borderWidth: 1,
      };
    }),
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
        offset: true,
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
