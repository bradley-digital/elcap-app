import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import AccountManagement from "pages/AccountManagement/AccountManagement";
import MoneyMovement from "pages/MoneyMovement/MoneyMovement";
import MoneyMovementTransfer from "pages/MoneyMovementTransfer/MoneyMovementTransfer";
import Notification from "pages/Notification/Notification";
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

export default function AdminRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          {/* Paths with nested routes must not have "exact" */}
          <Route path="/user-management/:userId" component={User} />
          <Route path="/account-management/:accountId" component={Account} />
          <Route
            path="/money-movement/:transferId"
            component={MoneyMovementTransfer}
          />
          <Route exact path="/notifications" component={Notification} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user-management" component={UserManagement} />
          <Route exact path="/money-movement" component={MoneyMovement} />
          <Route
            exact
            path="/account-management"
            component={AccountManagement}
          />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/money-movement" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="money-movement" href="/money-movement">
          <IonIcon icon={swapHorizontal} />
          <IonLabel>Money movement</IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/account-management">
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
