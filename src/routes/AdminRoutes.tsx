import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import UserManagement from "pages/UserManagement/UserManagement";

// components
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { personCircle, settings} from "ionicons/icons";

export default function PortalRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/admin-account" component={Account} />
          <Route exact path="/user-management" component={UserManagement} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/admin-account" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="account" href="/admin-account">
          <IonIcon icon={personCircle} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
        <IonTabButton tab="user" href="/user-management">
          <IonIcon icon={settings} />
          <IonLabel>User Management</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
