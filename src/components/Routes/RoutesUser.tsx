import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";

// components
import { IonRouterOutlet } from "@ionic/react";

export default function UserRoutes() {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* Fallback route */}
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </IonRouterOutlet>
  );
}
