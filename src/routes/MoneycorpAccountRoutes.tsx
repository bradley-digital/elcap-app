import type { RouteComponentProps } from "react-router-dom";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import { IonRouterOutlet, useIonRouter } from "@ionic/react";

// pages
import MoneycorpAccount from "pages/MoneycorpAccount/MoneycorpAccount";

// hooks
import useMoneycorpAccount from "hooks/useMoneycorpAccount";
import useUser from "hooks/useUserManagement";

export default function MoneycorpAccountRoutes({ match }: RouteComponentProps) {
  const { accountsIsSuccess, accounts } = useMoneycorpAccount();
  const { data, isSuccess: usersIsSuccess } = useUser();
  const { accountId } = useParams<{ accountId: string }>();
  const router = useIonRouter();

  if (
    accountsIsSuccess &&
    typeof accounts !== "undefined" &&
    usersIsSuccess &&
    typeof data !== "undefined"
  ) {
    const account = accounts.find((account) => account.id === accountId);

    if (typeof account === "undefined") {
      router.push("/account-management/moneycorp");
      return null;
    }
    return (
      <IonRouterOutlet>
        <Switch>
          <Route
            path={`${match.url}`}
            render={() => <MoneycorpAccount account={account} users={data} />}
          />

          {/* Fallback route*/}
          <Route
            render={() => <Redirect to={`/account-management/moneycorp`} />}
          />
        </Switch>
      </IonRouterOutlet>
    );
  }

  return null;
}
