import tempData from "pages/Dashboard/tempData";

export default function useChartData(year: number) {
  const initialBalance = 1000000;
  const chartData: Array<number> = [];
  const chartLabels: Array<string> = [];

  const selectedYearData = tempData.filter(({ postingDate }) => {
    const date = new Date(postingDate);
    return date.getFullYear() === year;
  });

  selectedYearData.forEach(
    ({ transactionAmount, transactionType, postingDate }) => {
      let ammount = Number(transactionAmount);

      if (transactionType === "C") {
        ammount = ammount * -1;
      }

      ammount = ammount + initialBalance;

      chartData.push(ammount);

      const date = new Date(postingDate);
      const options: any = { month: "short", day: "numeric", year: "numeric" };
      const shortDate = date.toLocaleDateString("en-US", options);
      chartLabels.push(shortDate);
    }
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
        text: `${year} balance by week`,
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

  return { data, options };
}
