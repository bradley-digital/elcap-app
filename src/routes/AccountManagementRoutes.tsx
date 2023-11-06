import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import AccountManagementWesternAlliance from "pages/AccountManagement/AccountManagementWesternAlliance";

export default function AccountManagementRoutes({
  match,
}: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path={`${match.url}/western-alliance`}
          render={() => <AccountManagementWesternAlliance />}
        />

        {/* Fallback route */}
        <Route
          render={() => <Redirect to={`${match.url}/western-alliance`} />}
        />
      </Switch>
    </IonRouterOutlet>
  );
}
