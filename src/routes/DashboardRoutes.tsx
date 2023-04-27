import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import Overview from "pages/Dashboard/DashboardOverview";
import Transactions from "pages/Dashboard/DashboardTransactions";

export default function DashboardRoutes({ match }: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path={`${match.url}/overview`}
          render={() => <Overview />}
        />
        <Route
          exact
          path={`${match.url}/transactions`}
          render={() => <Transactions />}
        />
        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/overview`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
