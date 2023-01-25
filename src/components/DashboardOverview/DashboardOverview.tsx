import { useState } from "react";

// components
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonCol,
  IonGrid,
  IonRow,
  IonSpinner,
  useIonViewWillEnter,
} from "@ionic/react";

// hooks
import useChartData from "hooks/useChartData";

// styles
import "./DashboardOverview.scss";

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

  useIonViewWillEnter(() => {
    setIsChartVisible(true);
  });

  return (
    <div className="DashboardOverview">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol
            size-md="2"
            size-lg="2"
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
            size-md="10"
            size-lg="10"
            className="DashboardOverview__content"
          >
            {isChartVisible ? (
              <Line data={data} options={options} height={500} />
            ) : (
              <IonSpinner color="success" />
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
}
