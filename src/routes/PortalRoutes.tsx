import { Redirect, Route, Switch } from "react-router-dom";

// hooks
import useUser from "hooks/useUser";

// pages
import Dashboard from "pages/Dashboard/Dashboard";
import Docfox from "pages/Docfox/Docfox";
import Onboarding from "pages/Onboarding/Onboarding";
import Profile from "pages/Profile/Profile";

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
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/onboarding" component={Docfox} />
            {/* Fallback route */}
            <Route render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
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
  } else {
    return <Onboarding stage={onboardingStage} />;
  }
}
