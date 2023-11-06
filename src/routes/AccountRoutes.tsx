import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import { IonRouterOutlet, useIonRouter } from "@ionic/react";

// pages
import WesternAlliance from "pages/Account/AccountWesternAlliance";

// hooks
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

export default function AccountRoutes({ match }: RouteComponentProps) {
  const { accountsIsSuccess, accounts } = useWesternAllianceAccount();
  const { accountId } = useParams<{ accountId: string }>();
  const router = useIonRouter();

  if (accountsIsSuccess && typeof accounts !== "undefined") {
    const account = accounts.find((account) => account.id === accountId);

    if (typeof account === "undefined") {
      router.push("/account-management/western-alliance");
      return null;
    }
    return (
      <IonRouterOutlet>
        <Switch>
          <Route
            path={`${match.url}`}
            render={() => <WesternAlliance account={account} />}
          />
          {/* Fallback route*/}
          <Route
            render={() => (
              <Redirect to={`/account-management/western-alliance`} />
            )}
          />
        </Switch>
      </IonRouterOutlet>
    );
  }

  return null;
}
