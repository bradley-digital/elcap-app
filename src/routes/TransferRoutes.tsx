import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import Account from "pages/Transfer/TransferAccount";
import Overview from "pages/Transfer/TransferOverview";
import TransferExternal from "pages/Transfer/TransferExternal";

export default function TransferRoutes({ match }: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path={`${match.url}/overview`}
          render={() => <Overview />}
        />
        <Route exact path={`${match.url}/account`} render={() => <Account />} />
        <Route
          exact
          path={`${match.url}/external`}
          render={() => <TransferExternal />}
        />
        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/overview`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
