import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// components
import Notification from "pages/Notification/Notification";

export default function NotificationRoutes({ match }: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route
          exact
          path={`${match.url}/notifications`}
          render={() => <Notification />}
        />
        {/* Fallback route */}
        <Route render={() => <Redirect to={`${match.url}/notifications`} />} />
      </Switch>
    </IonRouterOutlet>
  );
}
