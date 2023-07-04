import { Redirect, Route, Switch } from "react-router-dom";

// hooks
import useUser from "hooks/useUser";

// pages
import Dashboard from "pages/Dashboard/Dashboard";
import Notification from "pages/Notification/Notification";
import Onboarding from "pages/Onboarding/Onboarding";
import Profile from "pages/Profile/Profile";
import Transfer from "pages/Transfer/Transfer";

// components
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { card, grid, personCircle } from "ionicons/icons";

export default function PortalRoutes() {
  const { profile } = useUser();

  if (typeof profile === "undefined") return null;

  const { onboardingStage } = profile;

  if (onboardingStage === "COMPLETE") {
    return (
      <IonTabs>
        <IonRouterOutlet>
          <Switch>
            {/* Paths with nested routes must not have "exact" */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/notifications" component={Notification} />
            <Route path="/transfer" component={Transfer} />
            <Route path="/profile" component={Profile} />
            {/* Fallback route */}
            <Route render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={grid} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="transfer" href="/transfer">
            <IonIcon icon={card} />
            <IonLabel>Money movement</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personCircle} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  } else {
    return (
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/onboarding" component={Onboarding} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/onboarding" />} />
        </Switch>
      </IonRouterOutlet>
    );
  }
}
