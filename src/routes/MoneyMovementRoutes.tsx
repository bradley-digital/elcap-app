import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import Overview from "pages/MoneyMovement/MoneyMovementOverview";
import Transfer from "pages/MoneyMovement/MoneyMovementTransfer";
import TransferExternal from "pages/MoneyMovement/MoneyMovementTransferExternal";

export default function MoneyMovementRoutes({ match }: RouteComponentProps) {
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
          path={`${match.url}/transfer`}
          render={() => <TransferExternal />}
        />
        <Route path={`${match.url}/:transferId`} render={() => <Transfer />} />

        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/overview`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
