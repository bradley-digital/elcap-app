import { useState } from "react";
import { Line } from "react-chartjs-2";

// components
import { Chart as ChartJS, registerables } from "chart.js/auto";
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";

// hooks
import useChartData from "hooks/useChartData";

// styles
import "./DashboardOverview.scss";

ChartJS.register(...registerables);

export default function DashboardOverview() {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedTransactionType, setSelectedTransactionType] = useState("all");
  const {
    data,
    options,
    transactionYears,
    transactionTypes,
    transactionTypeMap,
  } = useChartData(selectedYear, selectedTransactionType);

  setTimeout(() => {
    setIsChartVisible(true);
  }, 900);

  return (
    <div className="DashboardOverview">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol
            size-md="1"
            size-lg="1"
            className="DashboardOverview__content"
          >
            <IonList>
              <IonItem>
                <IonSelect
                  placeholder="Select Year"
                  onIonChange={(e) => setSelectedYear(e.detail.value)}
                >
                  <IonSelectOption value={0}>All</IonSelectOption>
                  {Array.from(transactionYears).map((year) => (
                    <IonSelectOption key={year} value={year}>
                      {year}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonSelect
                  placeholder="Select Transaction Type"
                  onIonChange={(e) =>
                    setSelectedTransactionType(e.detail.value)
                  }
                >
                  <IonSelectOption value="all">All</IonSelectOption>
                  {Array.from(transactionTypes).map((transactionType) => (
                    <IonSelectOption
                      key={transactionType}
                      value={transactionType}
                    >
                      {transactionTypeMap[transactionType]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
          </IonCol>
          <IonCol
            size-md="8"
            size-lg="8"
            className="DashboardOverview__content"
          >
            {isChartVisible && (
              <Line data={data} options={options} height={500} />
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
}
