import { Redirect, Route, Switch } from "react-router-dom";

// pages
import AccountManagement from "pages/AccountManagement/AccountManagement";
import MoneyMovement from "pages/MoneyMovement/MoneyMovement";
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

import {
  business,
  personCircle,
  peopleCircle,
  swapHorizontal,
} from "ionicons/icons";
import Account from "pages/Account/Account";

export default function AdminRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          {/* Paths with nested routes must not have "exact" */}
          <Route path="/user-management/:userId" component={User} />
          <Route
            path="/account-management/western-alliance/:accountId"
            component={Account}
          />
          <Route path="/money-movement" component={MoneyMovement} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user-management" component={UserManagement} />
          <Route path="/account-management" component={AccountManagement} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/money-movement" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="money-movement" href="/money-movement">
          <IonIcon icon={swapHorizontal} />
          <IonLabel>Money Movement</IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/account-management/western-alliance">
          <IonIcon icon={business} />
          <IonLabel>Accounts</IonLabel>
        </IonTabButton>
        <IonTabButton tab="user" href="/user-management">
          <IonIcon icon={peopleCircle} />
          <IonLabel>Users</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personCircle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
