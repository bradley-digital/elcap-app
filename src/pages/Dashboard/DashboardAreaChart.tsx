import { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import useChartData from "hooks/useChartData";

ChartJS.register(...registerables);

export function DashboardAreaChart() {
  const [selectedYear, setSelectedYear] = useState(2021);
  const { data, options } = useChartData(selectedYear);

  return (
    <>
      <div>
        <IonList>
          <IonItem lines="none">
            <IonLabel>Year</IonLabel>
          </IonItem>
          <IonItem>
            <IonSelect
              placeholder="Select Year"
              onIonChange={(e) => setSelectedYear(e.detail.value)}
            >
              <IonSelectOption value={2021}>2021</IonSelectOption>
              <IonSelectOption value={2022}>2022</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </div>
      <div>
        <Line data={data} options={options} height={500} />
      </div>
    </>
  );
}
