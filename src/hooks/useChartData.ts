// import tempData from "components/DashboardOverview/tempData";

export default function useChartData(
  year: number,
  selectedTransactionType: string
) {
  let initialBalance = 0;
  // const currentBalance = 1000000.86;
  const currentBalance = 15;
  let transactionsYear: string | number;
  const transactionsData: Array<number> = [];
  const chartLabels: Array<string> = [];
  const label = selectedTransactionType === "all" ? "Balance" : "Transactions";

  const tempData = [
    { transactionAmount: 2, transactionType: "C", postingDate: "03/01/2020" },
    { transactionAmount: 10, transactionType: "D", postingDate: "03/02/2020" },
    { transactionAmount: 3, transactionType: "C", postingDate: "03/03/2020" },

    { transactionAmount: 2, transactionType: "D", postingDate: "03/04/2021" },
    { transactionAmount: 3, transactionType: "C", postingDate: "03/05/2021" },
    { transactionAmount: 4, transactionType: "D", postingDate: "03/06/2021" },

    { transactionAmount: 2, transactionType: "D", postingDate: "03/04/2022" },
    { transactionAmount: 10, transactionType: "C", postingDate: "03/05/2022" },
    { transactionAmount: 7, transactionType: "D", postingDate: "03/06/2022" },
  ];

  tempData.sort(
    (a, b) =>
      new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
  );

  function getInitialAmount(data, selectedYearBalance) {
    data.forEach(({ transactionAmount, transactionType }) => {
      switch (transactionType) {
        case "C":
          selectedYearBalance += Number(transactionAmount);
          break;
        case "D":
          selectedYearBalance -= Number(transactionAmount);
          break;
        case "F":
          selectedYearBalance += Number(transactionAmount); // validate
          break;
        case "M":
          selectedYearBalance -= Number(transactionAmount);
          break;
        case "X":
          selectedYearBalance += Number(transactionAmount); // validate
          break;
        default:
          break;
      }
    });
    return selectedYearBalance;
  }

  const transactionYears = new Set(
    tempData.map(({ postingDate }) => new Date(postingDate).getFullYear())
  );

  const firstTransactionYear = Math.min(
    ...tempData.map(({ postingDate }) => new Date(postingDate).getFullYear())
  );

  const lastTransactionYear = Math.max(
    ...tempData.map(({ postingDate }) => new Date(postingDate).getFullYear())
  );

  const transactionTypes = new Set(
    tempData.map(({ transactionType }) => transactionType)
  );

  const selectedYearData = tempData.filter(({ postingDate }) => {
    const date = new Date(postingDate);

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
  });

  const transactionTypeMap = {
    C: "Credit",
    D: "Debit",
    F: "Float",
    M: "Miscellaneous Service Charge",
    X: "Reversed",
  };

  selectedYearData.forEach(
    ({ transactionAmount, transactionType, postingDate }) => {
      let amount = Number(transactionAmount);

      if (transactionType === "C") {
        amount = amount * -1;
      }

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

      transactionsData.push(amount);

      const date = new Date(postingDate);
      const options: any = { month: "short", day: "numeric", year: "numeric" };
      const shortDate = date.toLocaleDateString("en-US", options);

      chartLabels.push(shortDate);
    }
  );

  initialBalance = getInitialAmount(tempData, currentBalance);

  const balanceData = transactionsData.reduce(
    (acc, val) => {
      const lastVal = acc[acc.length - 1];
      const newVal = lastVal + val;
      acc.push(newVal);
      return acc;
    },
    [initialBalance]
  );
  balanceData.shift();

  chartLabels.sort(
    (a, b) => new Date(a).getFullYear() - new Date(b).getFullYear()
  );

  const chartData =
    selectedTransactionType === "all" ? balanceData : transactionsData;

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `${label}`,
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
        text: `${transactionsYear} ${label}`,
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
          text: `${label}`,
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

// useChartData(0, "all");
