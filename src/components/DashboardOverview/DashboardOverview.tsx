import { useEffect, useState } from "react";
import "chart.js/auto";
import hash from "object-hash";

// components
import { Scatter } from "react-chartjs-2";
import {
  IonItem,
  IonLabel,
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
import useUser from "hooks/useUser";

// styles
import "./DashboardOverview.scss";

export default function DashboardOverview() {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [selectedAccountNumbers, setSelectedAccountNumbers] = useState([""]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Max");
  const { isSuccess: userIsSuccess, data: userData } = useUser();
  const {
    isSuccess,
    data,
    accounts,
    options,
    accountsCurrentBalanceTotal,
    transactionTypes,
    transactionTypeMap,
  } = useChartData(selectedTimeRange, selectedAccountNumbers);

  useEffect(() => {
    accounts &&
      setSelectedAccountNumbers(
        accounts?.accounts.map((account: any) => account?.accountNumber)
      );
  }, [accounts]);

  useEffect(() => {
    accounts &&
      setSelectedAccountNumbers(
        accounts?.accounts.map((account: any) => account?.accountNumber)
      );
  }, [accounts]);

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
            size-sm="12"
            size-md="12"
            size-lg="12"
            className="DashboardOverview__header"
          >
            <h1>{userIsSuccess && userData && userData.companyName}</h1>
          </IonCol>
          <IonCol
            size-xs="12"
            size-sm="6"
            size-md="8"
            size-lg="9"
            className="DashboardOverview__details"
          >
            <IonText>
              <h2>Total Portfolio Balance</h2>
              <p>{currentBalanceUSD}</p>
              <h2>Account Balances</h2>
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
                <IonLabel position="floating">Accounts</IonLabel>
                <IonSelect
                  placeholder="Select Account"
                  onIonChange={(e) => setSelectedAccountNumbers(e.detail.value)}
                  multiple={true}
                  value={selectedAccountNumbers}
                >
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
                <IonLabel position="floating">Date Range</IonLabel>
                <IonSelect
                  placeholder="Select Date Range"
                  onIonChange={(e) => setSelectedTimeRange(e.detail.value)}
                  value={selectedTimeRange}
                >
                  {timeRange.map((range) => (
                    <IonSelectOption key={range} value={range}>
                      {range}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
          </IonCol>
          <IonCol className="DashboardOverview__content--chart">
            {isChartVisible ? (
              <Scatter data={data} options={options} />
            ) : (
              <IonSpinner color="success" />
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
}
