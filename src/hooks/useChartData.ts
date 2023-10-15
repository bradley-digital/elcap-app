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
  sortBy?: string
) {
  const { accounts, backfilledTransactions } = useUserWesternAllianceAccount(
    selectedTimeRange,
    sortBy
  );

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
    0
  );

  const isSingleAccountSelected = selectedAccountNumbers.length < 2;
  const isAllAccountsSelected =
    selectedAccountNumbers.length === accounts.length;

  const filteredAccountTransactions = (accountNumber: string | number) => {
    const accountsByAccountNumber = backfilledTransactions?.filter(
      (transaction) => transaction.accountNumber === accountNumber
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
      }
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
        (account: any) => account.accountNumber === selectedAccountNumbers[0]
      )
    : individualAccounts;

  // create a list of the months with missing transactions
  const missingMonthDates: any[] = [];
  selectedAccounts.forEach((account: any) => {
    account.transactions.sort(
      (a: any, b: any) =>
        new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
    );
    account.transactions.forEach((transaction: any, index: number) => {
      const postingDates = account.transactions.map(
        (transaction: any) => transaction.postingDate
      );

      // check if the there are missing months in the posting dates 
      // exclude first month
      if (index !== 0) {
        const previousMonth = new Date(transaction.postingDate).getMonth();
        const previousYear = new Date(transaction.postingDate).getFullYear();
        const previousPostingDate = new Date(previousYear, previousMonth, 0);
        const previousPostingDateString = previousPostingDate.toISOString();

        if (!postingDates.includes(previousPostingDateString)) {
          missingMonthDates.push({
            accountNumber: account.accountNumber,
            postingDate: previousPostingDateString,
          });
        }
      }
    });
  });

  // create transactions for months that have none
  const backfilledMissingMonthTransactions = missingMonthDates.map(
    (missingMonthDate) => {
      // find the last transaction in the month before missingMonthDate
      const previousMonth =
        new Date(missingMonthDate.postingDate).getMonth() - 1;
      const previousYear = new Date(missingMonthDate.postingDate).getFullYear();

      const missingMonthAccount = selectedAccounts.find(
        (account: any) =>
          account.accountNumber === missingMonthDate.accountNumber
      );

      // for each missingMonth look for the last transaction in the previous month
      const previousTransaction = missingMonthAccount.transactions
        .slice()
        .reverse()
        .find(
          (transaction: any) =>
            new Date(transaction.postingDate).getMonth() === previousMonth &&
            new Date(transaction.postingDate).getFullYear() === previousYear
        );

      return {
        id: previousTransaction?.id,
        accountNumber: previousTransaction?.accountNumber,
        postingDate: missingMonthDate.postingDate,
        transactionAmount: previousTransaction?.transactionAmount,
        accountBalance: previousTransaction?.accountBalance,
        transactionCode: previousTransaction?.transactionCode,
        transactionIsReversed: previousTransaction?.transactionIsReversed,
        transactionType: previousTransaction?.transactionType,
        tempIdentifier: "tempIdentifier",
      };
    }
  );

  console.log("backfilledMissingMonths:", backfilledMissingMonthTransactions);
  // console.log("missingMonthDates:", missingMonthDates);
  // console.log("selectedAccounts:", selectedAccounts);

  // combine all selected accounts into one account
  const combinedAccounts: any = [
    {
      id: "",
      accountNumber: "",
      accountName: "All Accounts",
      accountBalance: "",
      client: "",
      routingNumber: "",
      transactions: [],
    },
  ];

  selectedAccounts.forEach((account: any) => {
    // add account balance to combined account
    combinedAccounts[0].accountBalance =
      Number(combinedAccounts[0].accountBalance) +
      Number(account.accountBalance);

    // add transactions to combined account
    combinedAccounts[0].transactions = [
      ...combinedAccounts[0].transactions,
      ...account.transactions,
      ...backfilledMissingMonthTransactions,
    ];
  });

  // sort combined accounts transactions by posting date
  combinedAccounts[0].transactions.sort(
    (a: any, b: any) =>
      new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
  );

  // if selected accounts transactions are on the same day, combine them
  const combinedAccountsTransactions: any = [];
  combinedAccounts[0].transactions.forEach((transaction: any) => {
    const transactionIndex = combinedAccountsTransactions.findIndex(
      (combinedTransaction: any) =>
        combinedTransaction.postingDate === transaction.postingDate
    );

    if (transactionIndex === -1) {
      combinedAccountsTransactions.push(transaction);
    } else {
      combinedAccountsTransactions[transactionIndex].accountBalance =
        Number(combinedAccountsTransactions[transactionIndex].accountBalance) +
        Number(transaction.accountBalance);
    }
  });

  combinedAccounts[0].transactions = combinedAccountsTransactions;
  // console.log("combinedAccounts:", combinedAccounts);

  const selectedAccountTransactions = isSingleAccountSelected
    ? filteredAccountTransactions(selectedAccountNumbers[0])
    : backfilledTransactions;

  function createChartData(
    accountTransactions: Transaction[],
    accountBalance: number
  ) {
    const balanceData: Array<any> = [];

    accountTransactions.sort(
      (a, b) =>
        new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
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
        }
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
      }
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
    selectedAccountTransactions.map(({ transactionType }) => transactionType)
  );

  const allOrSelectedAccounts = isAllAccountsSelected
    ? combinedAccounts
    : selectedAccounts;

  const data = {
    datasets: allOrSelectedAccounts.map((account: any, index: number) => {
      const accountBalance = Number(account.accountBalance);
      const { balanceData } = createChartData(
        account.transactions,
        accountBalance
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
