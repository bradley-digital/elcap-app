import type { Transaction } from "hooks/useWesternAllianceAccount";
import "chartjs-adapter-moment";

// lib
import { currency, date } from "lib/formats";

// hooks
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

const dateOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export default function useChartData(
  selectedTimeRange: string,
  selectedAccountNumbers: string[],
  sortBy?: string,
) {
  const { accounts, backfilledTransactions } =
    useUserWesternAllianceAccount(selectedTimeRange, sortBy);

  console.log(backfilledTransactions);

  if (
    !backfilledTransactions ||
    backfilledTransactions.length === 0 ||
    !accounts ||
    accounts.length === 0
  ) {
    return {
      isSuccess: false,
      data: undefined,
      options: undefined,
      accountBalance: undefined,
      transactionTypes: undefined,
    };
  }

  const accountsBalanceTotal = accounts?.reduce(
    (acc: number, account: any) => acc + Number(account.accountBalance),
    0,
  );

  const isSingleAccountSelected = selectedAccountNumbers.length < 2;

  const filteredAccountTransactions = (accountNumber: string | number) => {
    const accountsByAccountNumber = backfilledTransactions?.filter(
      (transaction) => transaction.accountNumber === accountNumber,
    );

    const filteredTransactions = accountsByAccountNumber.map(
      (transaction: Transaction) => {
        return {
          id: transaction.id,
          accountNumber: transaction.accountNumber,
          postingDate: transaction.postingDate,
          transactionAmount: transaction.transactionAmount,
          accountBalance: transaction.accountBalance,
          transactionCode: transaction.transactionCode,
          transactionIsReversed: transaction.transactionIsReversed,
          transactionType: transaction.transactionType,
        };
      },
    );

    return filteredTransactions;
  };

  const individualAccounts: any = [];
  // adds transactions to each account
  accounts?.forEach((account: any) => {
    individualAccounts.push({
      ...account,
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      transactions: filteredAccountTransactions(account.accountNumber),
    });
  });

  const selectedAccounts = isSingleAccountSelected
    ? individualAccounts.filter(
        (account: any) => account.accountNumber === selectedAccountNumbers[0],
      )
    : individualAccounts;

  const selectedAccountTransactions = isSingleAccountSelected
    ? filteredAccountTransactions(selectedAccountNumbers[0])
    : backfilledTransactions;

  function createChartData(
    accountTransactions: Transaction[],
    accountBalance: number,
  ) {
    const balanceData: Array<any> = [];

    accountTransactions.sort(
      (a, b) =>
        new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime(),
    );

    let balanceAtTimeOfTransaction = accountBalance;

    const transactionsWithBalance = accountTransactions
      .reverse()
      .map(
        ({
          transactionType,
          transactionAmount,
          postingDate,
          accountBalance,
        }) => {
          const convertedTransactionAmount = Number(transactionAmount);

          // Round to avoid float precision errors
          const roundedBalance =
            Math.round(balanceAtTimeOfTransaction * 100) / 100;

          const transaction = {
            transactionAmount: convertedTransactionAmount,
            transactionType,
            postingDate,
            balanceAtTimeOfTransaction: roundedBalance,
            accountBalance: accountBalance,
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
        },
      )
      .reverse();

    const transactionsWithBalanceByYear = transactionsWithBalance.filter(
      (transaction) => {
        const date = new Date(transaction.postingDate);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        const diffYears = timeDiff / (1000 * 3600 * 24 * 365);
        const diffMonths = diffYears * 12;

        switch (selectedTimeRange) {
          case "YTD":
            return date.getFullYear() === currentDate.getFullYear();
          case "MTD":
            return (
              date.getFullYear() === currentDate.getFullYear() &&
              date.getMonth() === currentDate.getMonth()
            );
          case "3M":
            return diffMonths <= 3;
          case "1Y":
            return diffYears <= 1;
          case "3Y":
            return diffYears <= 3;
          case "5Y":
            return diffYears <= 5;
          case "Max":
            return true;
          default:
            return true;
        }
      },
    );

    transactionsWithBalanceByYear.forEach((balance) => {
      const shortDate = date(balance.postingDate, dateOptions);

      const balanceCoordinates = {
        x: Date.parse(shortDate),
        y: balance.accountBalance,
      };

      balanceData.push(balanceCoordinates);
    });

    return {
      balanceData,
    };
  }

  const solidColorArray = [
    "#007854",
    "#3dc2ff",
    "#5260ff",
    "#2dd36f",
    "#ffc409",
    "#eb445a",
  ];

  const transparentColorArray = [
    "rgb(0, 120, 84, 0.2)",
    "rgb(61, 194, 255, 0.2)",
    "rgb(82, 96, 255, 0.2)",
    "rgb(45, 211, 111, 0.2)",
    "rgb(255, 196, 9, 0.2)",
    "rgb(235, 68, 90, 0.2)",
  ];

  const transactionTypes = new Set(
    selectedAccountTransactions.map(({ transactionType }) => transactionType),
  );

  const data = {
    datasets: selectedAccounts.map((account: any, index: number) => {
      const accountBalance = Number(account.accountBalance);
      const { balanceData } = createChartData(
        account.transactions,
        accountBalance,
      );

      return {
        label: account.accountName,
        fill: "start",
        showLine: true,
        data: balanceData,
        borderColor: solidColorArray[index],
        backgroundColor: transparentColorArray[index],
        pointBorderColor: solidColorArray[index],
        pointBackgroundColor: solidColorArray[index],
        borderWidth: 1,
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    ticks: {
      autoSkip: false,
    },
    elements: {
      point: {
        pointStyle: false as const,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }

            if (context.parsed.x !== null) {
              const shortDate = date(context.parsed.x, dateOptions);
              label += shortDate + " | ";
            }

            if (context.parsed.y !== null) {
              label += currency(context.parsed.y);
            }
            return label;
          },
        },
      },
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Account Balance Timeline",
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "month" as const,
          displayFormats: {
            week: "MMM YYYY",
          },
        },
        offset: true,
        title: {
          display: true,
          text: "Date Range",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Balance",
        },
      },
    },
  };

  return {
    isSuccess: true,
    data,
    accounts,
    options,
    accountsCurrentBalanceTotal: accountsBalanceTotal,
    transactionTypes,
  };
}
