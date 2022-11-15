import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

// hooks
import useSessionTimeout from "hooks/useSessionTimeout";

// components
import {
  IonContent,
  IonHeader,
  IonList,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Scan from "components/Pay/PayScan";
import Wallet from "components/Pay/PayWallet";
import Transactions from "components/Pay/PayTransactions";
import PayMenuLinks from "components/Pay/PayMenuLinks";

export default function Pay({ match }: RouteComponentProps) {
  useSessionTimeout();

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu side="start" menuId="main" contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Pay</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <PayMenuLinks />
            </IonList>
          </IonContent>
        </IonMenu>
        <IonContent id="main">
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
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
}
