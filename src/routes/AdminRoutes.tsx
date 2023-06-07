import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import AccountManagement from "pages/AccountManagement/AccountManagement";
import Profile from "pages/Profile/ProfileOverview";
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

import { business, personCircle, peopleCircle } from "ionicons/icons";

export default function AdminRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          {/* Paths with nested routes must not have "exact" */}
          <Route path="/user-management/:userId" component={User} />
          <Route path="/account-management/:accountId" component={Account} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user-management" component={UserManagement} />
          <Route
            exact
            path="/account-management"
            component={AccountManagement}
          />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/user-management" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="user" href="/user-management">
          <IonIcon icon={peopleCircle} />
          <IonLabel>Users</IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/account-management">
          <IonIcon icon={business} />
          <IonLabel>Accounts</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personCircle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
