import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import InternationalTransferOverview from "pages/InternationalTransfer/Overview";
import InternationalTransferFund from "pages/InternationalTransfer/TransferFund";
import InternationalTransferPay from "pages/InternationalTransfer/Pay";
import InternationalTransferExchangeAndPay from "pages/InternationalTransfer/ExchangeAndPay";
import InternationalTransferExchange from "pages/InternationalTransfer/Exchange";

export default function InternationalTransferRoutes({
  match,
}: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path={`${match.url}/overview`}
          render={() => <InternationalTransferOverview />}
        />
        <Route
          exact
          path={`${match.url}/fund`}
          render={() => <InternationalTransferFund />}
        />
        <Route
          exact
          path={`${match.url}/pay`}
          render={() => <InternationalTransferPay />}
        />
        <Route
          exact
          path={`${match.url}/exchange`}
          render={() => <InternationalTransferExchange />}
        />
        <Route
          exact
          path={`${match.url}/exchange-pay`}
          render={() => <InternationalTransferExchangeAndPay />}
        />

        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/overview`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
