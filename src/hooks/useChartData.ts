import type { Transaction } from "hooks/useWesternAllianceAccount";
import "chartjs-adapter-moment";
import { v4 as uuidv4 } from "uuid";
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

type StringMap = {
  [key: string]: string;
};

export default function useChartData(
  selectedTimeRange: string,
  selectedAccountNumbers: string[]
) {
  const { accounts, transactions } = useUserWesternAllianceAccount();

  const transactionsSortedByFirst = transactions
    ? transactions?.sort(
        (a, b) =>
          Number(new Date(a.postingDate)) - Number(new Date(b.postingDate))
      )
    : [];

  if (!transactions) {
    return {
      isSuccess: false,
      data: undefined,
      options: undefined,
      currentBalance: undefined,
      transactionTypes: undefined,
      transactionTypeMap: undefined,
    };
  }

  const accountsCurrentBalanceTotal = accounts?.accounts.reduce(
    (acc: number, account: any) => acc + Number(account.accountBalance),
    0
  );

  const transactionTypeMap: StringMap = {
    C: "Credit",
    D: "Debit",
    F: "Float",
    M: "Miscellaneous Service Charge",
    X: "Reversed",
  };

  const isSingleAccountSelected = selectedAccountNumbers.length < 2;

  const filteredAccountTransactions = (accountNumber: string | number) => {
    const accountsByAccountNumber = transactions?.filter(
      (transaction) => transaction.accountNumber === accountNumber
    );

    const filteredTransactions = accountsByAccountNumber.map(
      (transaction: Transaction) => {
        return {
          id: transaction.id,
          accountNumber: transaction.accountNumber,
          postingDate: transaction.postingDate,
          transactionAmount: transaction.transactionAmount,
          transactionCode: transaction.transactionCode,
          transactionIsReversed: transaction.transactionIsReversed,
          transactionType: transaction.transactionType,
        };
      }
    );

    return filteredTransactions;
  };

  const individualAccounts: any = [];
  accounts?.accounts.forEach((account: any) => {
    individualAccounts.push({
      accountTitle: account.accountTitle,
      accountNumber: account.accountNumber,
      transactions: filteredAccountTransactions(account.accountNumber),
      currentBalance: account.accountBalance,
    });
  });

  // account smoothing
  individualAccounts.forEach((account: any) => {
    // if transactions happen on the same day, combine them
    account.transactions = account.transactions.reduce(
      (acc: any, curr: any) => {
        const existingTransaction = acc.find(
          (t: any) => t.postingDate === curr.postingDate
        );

        curr.transactionAmount = Number(curr.transactionAmount);

        if (existingTransaction) {
          existingTransaction.transactionAmount += curr.transactionAmount;
        } else {
          acc.push(curr);
        }

        return acc;
      },
      []
    );

    // loop through accounts from within each account
    individualAccounts.forEach((indvAccount: any) => {
      // start logic to add transactions for every day
      const firstPostingDate = new Date(
        transactionsSortedByFirst[0].postingDate
      ).getTime();

      const transactionsSortedByLast = indvAccount.transactions.sort(
        (a: any, b: any) =>
          Number(new Date(b.postingDate)) - Number(new Date(a.postingDate))
      );
      const lastPostingDate = new Date(
        transactionsSortedByLast[0].postingDate
      ).getTime();

      const daysBetween = Math.floor(
        (lastPostingDate - firstPostingDate) / (1000 * 60 * 60 * 24)
      );

      for (let i = 0; i < daysBetween; i++) {
        const postingDate = new Date(
          firstPostingDate + i * 24 * 60 * 60 * 1000
        );

        const existingTransaction = indvAccount.transactions.find(
          (t: any) => t.postingDate === postingDate.toISOString()
        );

        if (!existingTransaction) {
          indvAccount.transactions.push({
            postingDate: postingDate.toISOString(),
            id: uuidv4(),
            accountNumber: indvAccount.accountNumber,
            transactionAmount: "0",
          });
        }
      }
      // end logic to add transactions for every day

      // exclude self
      if (account.accountNumber === indvAccount.accountNumber) {
        return;
      }

      const accountPostingDates = account.transactions.map((t: any) => {
        return t.postingDate;
      });

      //  get the postingDates that are not in indvAccount
      const postingDatesNotInIndvAccount = accountPostingDates.filter(
        (postingDate: any) => {
          return !indvAccount.transactions.some(
            (t: any) => t.postingDate === postingDate
          );
        }
      );

      // add a new transaction to indvAccount with the postingDates not in IndvAccount
      postingDatesNotInIndvAccount.forEach((postingDate: any) => {
        // find the previous transaction with the date closest to the postingDate
        const previousTransaction = indvAccount.transactions.reduce(
          (prev: any, curr: any) => {
            return Math.abs(
              Number(new Date(curr.postingDate)) - Number(new Date(postingDate))
            ) <
              Math.abs(
                Number(new Date(prev.postingDate)) -
                  Number(new Date(postingDate))
              )
              ? curr
              : prev;
          }
        );

        indvAccount.transactions.push({
          postingDate,
          id: uuidv4(),
          accountNumber: indvAccount.accountNumber,
          transactionAmount: previousTransaction.transactionAmount,
        });
      });
    });
  });

  const selectedAccounts = isSingleAccountSelected
    ? individualAccounts.filter(
        (account: any) => account.accountNumber === selectedAccountNumbers[0]
      )
    : individualAccounts;


  const selectedAccountTransactions = isSingleAccountSelected
    ? filteredAccountTransactions(selectedAccountNumbers[0])
    : transactions;

  function createChartData(
    accountTransactions: Transaction[],
    currentBalance: number
  ) {
    const balanceData: Array<any> = [];

    accountTransactions.sort(
      (a, b) =>
        new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
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
      const date = new Date(balance.postingDate);
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      const shortDate = date.toLocaleDateString("en-US", options);

      const balanceCoordinates = {
        x: Date.parse(shortDate),
        y: balance.balanceAtTimeOfTransaction,
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

  const data = {
    datasets: selectedAccounts.map((account: any, index: number) => {
      const currentBalance = Number(account.currentBalance);
      const { balanceData } = createChartData(
        account.transactions,
        currentBalance
      );

      return {
        label: account.accountTitle,
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
              const date = new Date(context.parsed.x);
              const options: Intl.DateTimeFormatOptions = {
                month: "short",
                day: "numeric",
                year: "numeric",
              };
              const shortDate = date.toLocaleDateString("en-US", options);
              label += shortDate + " | ";
            }

            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
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
    accountsCurrentBalanceTotal,
    transactionTypes,
    transactionTypeMap,
  };
}
