import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";

import { IonRouterOutlet } from "@ionic/react";

import Scan from "pages/Pay/PayScan";
import Wallet from "pages/Pay/PayWallet";
import Transactions from "pages/Pay/PayTransactions";

export default function PayRoutes({ match }: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route exact path={`${match.url}/scan`} component={Scan} />
        <Route exact path={`${match.url}/wallet`} component={Wallet} />
        <Route
          exact
          path={`${match.url}/transactions`}
          component={Transactions}
        />
        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/scan`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
