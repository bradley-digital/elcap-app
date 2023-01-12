import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import Dashboard from "pages/Dashboard/Dashboard";

// components
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { personCircle } from "ionicons/icons";

export default function PortalRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/portal-account" component={Account} />
          <Route exact path="/dashboard/overview" component={Dashboard} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/portal-account" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="account" href="/portal-account">
          <IonIcon icon={personCircle} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
