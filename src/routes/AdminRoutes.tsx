import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import UserManagement from "pages/UserManagement/UserManagement";
import User from "pages/User/User";

// components
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { personCircle, settings } from "ionicons/icons";

export default function AdminRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          {/* Paths with nested routes must not have "exact" */}
          <Route path="/user-management/:userId" component={User} />
          <Route exact path="/profile" component={Account} />
          <Route exact path="/user-management" component={UserManagement} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/user-management" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="user" href="/user-management">
          <IonIcon icon={settings} />
          <IonLabel>User management</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personCircle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
