// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import { DashboardAreaChart } from "./DashboardAreaChart";

// hooks
import useUser from "hooks/useUser";
import { useState } from "react";

export default function Dashboard() {
  const { isSuccess, data } = useUser();
  const [isChartVisible, setIsChartVisible] = useState(false);

  setTimeout(() => {
    setIsChartVisible(true);
  }, 500);

  if (isSuccess && typeof data !== "undefined") {
    return (
      <PageTemplate title="Dashboard" className="Dashboard">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              {isChartVisible && <DashboardAreaChart />}
            </IonCol>
          </IonRow>
        </IonGrid>
      </PageTemplate>
    );
  }

  // Need better error state
  return null;
}
