import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import Overview from "pages/Profile/ProfileOverview";
import Onboarding from "pages/Profile/ProfileOnboarding";

export default function ProfileRoutes({ match }: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path={`${match.url}/overview`}
          render={() => <Overview />}
        />
        <Route
          exact
          path={`${match.url}/onboarding`}
          render={() => <Onboarding />}
        />
        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/overview`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
