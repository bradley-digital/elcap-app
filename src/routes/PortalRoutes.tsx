import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import Dashboard from "pages/Dashboard/Dashboard";
import Docfox from "pages/Docfox/Docfox";

// components
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { create, grid, personCircle } from "ionicons/icons";

export default function PortalRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/profile" component={Account} />
          <Route exact path="/onboarding" component={Docfox} />
          <Route exact path="/dashboard/overview" component={Dashboard} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/dashboard/overview" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/dashboard/overview">
          <IonIcon icon={grid} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="onboarding" href="/onboarding">
          <IonIcon icon={create} />
          <IonLabel>Onboarding</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personCircle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
