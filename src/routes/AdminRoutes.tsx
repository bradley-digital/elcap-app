import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import UserManagement from "pages/UserManagement/UserManagement";
import User from "pages/User/User";
import WesternAllianceManagement from "pages/WesternAllianceManagement/WesternAllianceManagement";

// components
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";

import { personCircle, settings, extensionPuzzle } from "ionicons/icons";

export default function AdminRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          {/* Paths with nested routes must not have "exact" */}
          <Route path="/user-management/:userId" component={User} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/user-management" component={UserManagement} />
          <Route exact path="/western-alliance-management" component={WesternAllianceManagement} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/user-management" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="western-alliance" href="/western-alliance-management">
          <IonIcon icon={extensionPuzzle} />
          <IonLabel>Western Alliance management</IonLabel>
        </IonTabButton>
        <IonTabButton tab="user" href="/user-management">
          <IonIcon icon={settings} />
          <IonLabel>User management</IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/account">
          <IonIcon icon={personCircle} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
