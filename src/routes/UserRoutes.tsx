import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import { IonRouterOutlet, useIonRouter } from "@ionic/react";

// components
import Account from "pages/User/UserAccount";
import WesternAlliance from "pages/User/UserWesternAlliance";
import Docfox from "pages/User/UserDocfox";

// hooks
import useUserManagement from "hooks/useUserManagement";

export default function UserRoutes({ match }: RouteComponentProps) {
  const { isSuccess, data } = useUserManagement();
  const { userId } = useParams<{ userId: string }>();
  const router = useIonRouter();

  if (isSuccess && typeof data !== "undefined") {
    const user = data.find((user) => user.id === userId);

    if (typeof user === "undefined") {
      router.push("/user-management");
      return null;
    }

    return (
      <IonRouterOutlet>
        <Switch>
          <Route
            exact
            path={`${match.url}/profile`}
            render={() => <Account profile={user} />}
          />
          <Route
            exact
            path={`${match.url}/western-alliance`}
            render={() => <WesternAlliance profile={user} />}
          />
          <Route
            exact
            path={`${match.url}/docfox`}
            render={() => <Docfox profile={user} />}
          />
          {/* Fallback route */}
          <Route render={() => <Redirect to={`${match.url}/profile`} />} />
        </Switch>
      </IonRouterOutlet>
    );
  }

  // Need better error state
  return null;
}
