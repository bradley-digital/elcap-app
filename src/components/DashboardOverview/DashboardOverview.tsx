import { useState } from "react";
import "chart.js/auto";
import hash from "object-hash";

// components
import { Scatter } from "react-chartjs-2";
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
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Max");
  const [selectedTransactionType, setSelectedTransactionType] = useState("all");
  const {
    isSuccess,
    data,
    accounts,
    options,
    accountsCurrentBalanceTotal,
    transactionTypes,
    transactionTypeMap,
  } = useChartData(
    selectedTimeRange,
    selectedTransactionType,
    selectedAccountNumber
  );

  useIonViewWillEnter(() => {
    setIsChartVisible(true);
  });

  if (
    !isSuccess ||
    typeof data === "undefined" ||
    typeof accounts === "undefined" ||
    typeof options === "undefined" ||
    typeof accountsCurrentBalanceTotal === "undefined" ||
    typeof transactionTypes === "undefined" ||
    typeof transactionTypeMap === "undefined"
  ) {
    return null;
  }

  const USD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const currentBalanceUSD = USD.format(accountsCurrentBalanceTotal);

  const timeRange = ["YTD", "MTD", "3M", "1Y", "3Y", "5Y", "Max"];

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
              <h1>Total Portfolio Balance</h1>
              <p>{currentBalanceUSD}</p>
              <h1>Subtotal Balances</h1>
              {accounts.accounts.map((account: any) => {
                return (
                  <p key={hash(account)}>
                    {account.accountTitle +
                      ": " +
                      USD.format(account.accountBalance)}
                  </p>
                );
              })}
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
                  placeholder="Select Account"
                  onIonChange={(e) => setSelectedAccountNumber(e.detail.value)}
                >
                  <IonSelectOption value={0}>All</IonSelectOption>
                  {accounts &&
                    accounts?.accounts.map((account: any) => (
                      <IonSelectOption
                        key={account.accountNumber}
                        value={account.accountNumber}
                      >
                        {account.accountTitle}
                      </IonSelectOption>
                    ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonSelect
                  placeholder="Select Time Range"
                  onIonChange={(e) => setSelectedTimeRange(e.detail.value)}
                >
                  {timeRange.map((range) => (
                    <IonSelectOption key={range} value={range}>
                      {range}
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
                  {transactionTypes &&
                    Array.from(transactionTypes).map((transactionType) => (
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
              <Scatter data={data} options={options} height={500} />
            ) : (
              <IonSpinner color="success" />
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
}
