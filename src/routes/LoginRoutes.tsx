import { Redirect, Route, Switch } from "react-router-dom";
// components
import { IonRouterOutlet } from "@ionic/react";
// pages
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/ResetPassword/ResetPassword";
import SetPassword from "pages/SetPassword/SetPassword";

export default function LoginRoutes() {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetToken"
          component={ResetPassword}
        />
        <Route exact path="/register/:registerToken" component={SetPassword} />

        {/* Fallback route */}
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </IonRouterOutlet>
  );
}
