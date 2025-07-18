import { Redirect, Route, Switch } from "react-router-dom";

// icons
import { bag, card, personCircle } from "ionicons/icons";

// components
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

// pages
import Example from "pages/Example/Example";
import Pay from "pages/Pay/Pay";
import Profile from "pages/Profile/ProfileOverview";
import Shop from "pages/Shop/Shop";

export default function PaymentsRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          {/* Paths with nested routes must not have "exact" */}
          <Route path="/pay" component={Pay} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/example" component={Example} />
          {/* Fallback route */}
          <Route render={() => <Redirect to="/pay" />} />
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="shop" href="/shop">
          <IonIcon icon={bag} />
          <IonLabel>Shop</IonLabel>
        </IonTabButton>
        <IonTabButton tab="pay" href="/pay">
          <IonIcon icon={card} />
          <IonLabel>Pay</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personCircle} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
