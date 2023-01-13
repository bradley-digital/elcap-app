import tempData from "components/DashboardOverview/tempData";

export default function useChartData(
  year: number,
  selectedTransactionType: string
) {
  const initialBalance = 1000000;
  const chartData: Array<number> = [];
  const chartLabels: Array<string> = [];
  let transactionsYear: string | number;

  const lastTransactionYear = Math.max(
    ...tempData.map(({ postingDate }) => new Date(postingDate).getFullYear())
  );

  const transactionYears = new Set(
    tempData.map(({ postingDate }) => new Date(postingDate).getFullYear())
  );

  const transactionTypes = new Set(
    tempData.map(({ transactionType }) => transactionType)
  );

  const selectedYearData = tempData.filter(({ postingDate }) => {
    const date = new Date(postingDate);

    if (year === 0) {
      transactionsYear = "All";
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
      let ammount = Number(transactionAmount);

      if (transactionType === "C") {
        ammount = ammount * -1;
      }

      ammount = ammount + initialBalance;

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

      chartData.push(ammount);

      const date = new Date(postingDate);
      const options: any = { month: "short", day: "numeric", year: "numeric" };
      const shortDate = date.toLocaleDateString("en-US", options);

      chartLabels.push(shortDate);
    }
  );

  chartLabels.sort(
    (a, b) => new Date(a).getFullYear() - new Date(b).getFullYear()
  );

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Transactions",
        data: chartData,
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
        text: `${transactionsYear} transactions by week`,
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
          text: "Balance",
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
