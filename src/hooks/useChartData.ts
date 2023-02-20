import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";
import { Transaction } from "./useWesternAllianceAccount";

type StringMap = {
  [key: string]: string;
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

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const isSingleAccountSelected = selectedAccountNumber !== 0;

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

  const selectedAccounts = isSingleAccountSelected
    ? individualAccounts.filter(
        (account: any) => account.accountNumber === selectedAccountNumber
      )
    : individualAccounts;

  const selectedAccountTransactions = isSingleAccountSelected
    ? filteredAccountTransactions(selectedAccountNumber)
    : transactions;

  function createChartData(accountTransactions: Transaction[]) {
    const chartLabels: Array<string> = [];
    const transactionData: Array<any> = [];

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
        const shortDate = date.toLocaleDateString("en-US", dateOptions);

        transactionData.push({
          x: shortDate,
          y: transactionAmount,
        });
        chartLabels.push(shortDate);
      }
    );

    const balanceData = transactionsWithBalanceByYear.map((balance) => {
      const date = new Date(balance.postingDate);
      const shortDate = date.toLocaleDateString("en-US", dateOptions);
      const day = shortDate.split(" ")[1].replace(",", "");
      let week = shortDate.split(" ")[0] + " " + shortDate.split(" ")[2];

      if (Number(day) < 15) {
        week = week + " first half";
        // } else if (Number(day) >= 7 && Number(day) < 14) {
        //   week = week + " week 2";
        // } else if (Number(day) >= 14 && Number(day) < 21) {
        //   week = week + " week 3";
      } else if (Number(day) >= 15) {
        week = week + " second half";
      }

      const allAccountTransactions = {
        x: week,
        y: balance.balanceAtTimeOfTransaction,
      };
      const singleAccountTransactions = {
        x: shortDate,
        y: balance.balanceAtTimeOfTransaction,
      };

      return isSingleAccountSelected
        ? singleAccountTransactions
        : allAccountTransactions;
    });

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

  const transactionYears = createChartData(selectedAccountTransactions)[2];
  const transactionTypes = createChartData(selectedAccountTransactions)[3];

  const data = {
    datasets: selectedAccounts.map((account: any, index: number) => {
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
          text: "Time",
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
