import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Example from "pages/Example/Example";

// components
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

// icons
import { bag, card, personCircle } from "ionicons/icons";

export default function PortalRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/example" component={Example} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/example" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="shop" href="/example">
          <IonIcon icon={bag} />
          <IonLabel>example 1</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
