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
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";

// hooks
import useChartData from "hooks/useChartData";

// styles
import "./DashboardOverview.scss";

export default function DashboardOverview() {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedTransactionType, setSelectedTransactionType] = useState("all");
  const {
    data,
    options,
    currentBalance,
    transactionYears,
    transactionTypes,
    transactionTypeMap,
  } = useChartData(selectedYear, selectedTransactionType);

  const USD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const currentBalanceUSD = USD.format(currentBalance);

  useIonViewWillEnter(() => {
    setIsChartVisible(true);
  });

  return (
    <div className="DashboardOverview">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol
            size-xs="12"
            size-sm="6"
            size-md="8"
            size-lg="9"
            className="DashboardOverview__header"
          >
            <IonText>
              <h1>Account Balance</h1>
              <p>{currentBalanceUSD}</p>
            </IonText>
          </IonCol>
          <IonCol
            size-xs="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
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
          <IonCol className="DashboardOverview__content">
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
