import tempData from "components/DashboardOverview/tempData";

export default function useChartData(
  year: number,
  selectedTransactionType: string
) {
  let initialBalance = 0;
  const currentBalance = 1000000.86;
  // const currentBalance = 15;
  let transactionsYear: string | number;
  const transactionData: Array<number> = [];
  const chartLabels: Array<string> = [];
  const dataLabel =
    selectedTransactionType === "all" ? "Balance" : "Transactions";
  const transactionTypeMap = {
    C: "Credit",
    D: "Debit",
    F: "Float",
    M: "Miscellaneous Service Charge",
    X: "Reversed",
  };

  // const tempData = [
  //   { transactionAmount: 2, transactionType: "C", postingDate: "03/01/2020" },
  //   { transactionAmount: 10, transactionType: "D", postingDate: "03/02/2020" },
  //   { transactionAmount: 3, transactionType: "C", postingDate: "03/03/2020" },

  //   { transactionAmount: 2, transactionType: "D", postingDate: "03/04/2021" },
  //   { transactionAmount: 3, transactionType: "C", postingDate: "03/05/2021" },
  //   { transactionAmount: 4, transactionType: "D", postingDate: "03/06/2021" },

  //   { transactionAmount: 2, transactionType: "D", postingDate: "03/04/2022" },
  //   { transactionAmount: 10, transactionType: "C", postingDate: "03/05/2022" },
  //   { transactionAmount: 7, transactionType: "D", postingDate: "03/06/2022" },
  // ];

  tempData.sort(
    (a, b) =>
      new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
  );

  function getInitialBalance(data, currentBalance) {
    data.forEach(({ transactionAmount, transactionType }) => {
      const convertedTransactionAmount = Number(transactionAmount);

      switch (transactionType) {
        case "C":
          currentBalance += convertedTransactionAmount;
          break;
        case "D":
          currentBalance -= convertedTransactionAmount;
          break;
        case "F":
          currentBalance += convertedTransactionAmount; // validate
          break;
        case "M":
          currentBalance -= convertedTransactionAmount;
          break;
        case "X":
          currentBalance += convertedTransactionAmount; // validate
          break;
        default:
          break;
      }
    });
    return currentBalance;
  }

  const transactionYears = new Set(
    tempData.map(({ postingDate }) => new Date(postingDate).getFullYear())
  );

  const lastTransactionYear = Math.max(
    ...tempData.map(({ postingDate }) => new Date(postingDate).getFullYear())
  );

  const transactionTypes = new Set(
    tempData.map(({ transactionType }) => transactionType)
  );

  initialBalance = getInitialBalance(tempData, currentBalance);

  let balanceAtTimeOfTransaction = initialBalance;
  const transactionsWithBalance = tempData.map(
    ({ transactionType, transactionAmount, postingDate }) => {
      const convertedTransactionAmount = Number(transactionAmount);

      if (transactionType === "C") {
        balanceAtTimeOfTransaction -= convertedTransactionAmount;
      } else {
        balanceAtTimeOfTransaction += convertedTransactionAmount;
      }

      return {
        transactionAmount: convertedTransactionAmount,
        transactionType: transactionType,
        postingDate: postingDate,
        balanceAtTimeOfTransaction: balanceAtTimeOfTransaction,
      };
    }
  );

  const transactionsWithBalanceByYear = transactionsWithBalance.filter(
    (transaction) => {
      const date = new Date(transaction.postingDate);
      if (year === 0) {
        transactionsYear = "";
        return date.getFullYear();
      } else if (year === 1) {
        transactionsYear = lastTransactionYear;
        return date.getFullYear() === lastTransactionYear;
      } else {
        transactionsYear = year;
        return date.getFullYear() === year;
      }
    }
  );

  transactionsWithBalanceByYear.forEach(
    ({ transactionAmount, transactionType, postingDate }) => {
      const filterMap = {
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
        text: `${transactionsYear} ${dataLabel}`,
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
    data,
    options,
    transactionYears,
    transactionTypes,
    transactionTypeMap,
  };
}
