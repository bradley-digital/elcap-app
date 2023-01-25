import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";

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
          <Route exact path="/account" component={Account} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/account" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="account" href="/account">
          <IonIcon icon={personCircle} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
