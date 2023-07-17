import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import MoneyMovement from "components/MoneyMovement/MoneyMovement";
import MoneyMovementTransfer from "pages/MoneyMovementTransfer/MoneyMovementTransfer";
import TransferUserExternal from "pages/Transfer/TransferUserExternal";

export default function MoneyMovementRoutes({ match }: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path={`${match.url}/overview`}
          render={() => <MoneyMovement />}
        />
        <Route
          exact
          path={`${match.url}/transfer`}
          render={() => <TransferUserExternal />}
        />
        <Route
          path={`${match.url}/:transferId`}
          component={MoneyMovementTransfer}
        />

        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/overview`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
