import { useEffect, useState } from "react";
import "chart.js/auto";
import hash from "object-hash";

// lib
import { currency } from "lib/formats";

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

// styles
import "./DashboardOverview.scss";

export default function DashboardOverview() {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [selectedAccountNumbers, setSelectedAccountNumbers] = useState([""]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("YTD");
  const {
    isSuccess,
    data,
    accounts,
    options,
    accountsCurrentBalanceTotal,
    transactionTypes,
  } = useChartData(selectedTimeRange, selectedAccountNumbers);

  useEffect(() => {
    setSelectedAccountNumbers(
      accounts?.map((account) => account.accountNumber) || [""],
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
    typeof transactionTypes === "undefined"
  ) {
    return null;
  }

  const currentBalance = currency(accountsCurrentBalanceTotal);
  const timeRange = ["YTD", "MTD", "3M", "1Y", "3Y", "5Y", "Max"];

  const accountOptions =
    accounts
      ?.map((account) => {
        const truncatedAccountNumber = account.accountNumber.slice(-4);
        const label = `${account.accountName} (...${truncatedAccountNumber})`;
        return {
          value: account.accountNumber,
          label,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  return (
    <div className="DashboardOverview">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol
            size-xs="12"
            size-sm="6"
            size-md="6"
            size-lg="6"
            className="DashboardOverview__details"
          >
            <IonText>
              <h3>Total Portfolio Balance</h3>
              <p>{currentBalance}</p>
            </IonText>
          </IonCol>
          <IonCol
            size-xs="12"
            size-sm="6"
            size-md="6"
            size-lg="6"
            className="DashboardOverview__details"
          >
            <IonText>
              <h3>Account Balances</h3>
              {accounts?.map((account) => {
                return (
                  <p key={hash(account)}>
                    {`${account.accountName}: ${currency(
                      Number(account.accountBalance),
                    )}`}
                  </p>
                );
              })}
            </IonText>
          </IonCol>
          <IonCol size="12" className="DashboardOverview__filters">
            <IonList className="DashboardOverview__filters--wrapper">
              <IonItem>
                <IonLabel position="floating">Accounts</IonLabel>
                <IonSelect
                  interfaceOptions={{ cssClass: "FormAccountSelect" }}
                  placeholder="Select Account"
                  onIonChange={(e) => setSelectedAccountNumbers(e.detail.value)}
                  multiple={true}
                  value={selectedAccountNumbers}
                >
                  {accountOptions?.map((option) => (
                    <IonSelectOption key={option.value} value={option.value}>
                      {option.label}
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
          <IonCol size="12" className="DashboardOverview__content--chart">
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
