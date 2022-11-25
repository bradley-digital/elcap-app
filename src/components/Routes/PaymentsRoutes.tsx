import { Redirect, Route, Switch } from "react-router-dom";

// pages
import Account from "pages/Account/Account";
import Example from "pages/Example/Example";
import Pay from "pages/Pay/Pay";
import Shop from "pages/Shop/Shop";
import Loader from "components/Loader/Loader";

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

export default function PaymentsRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route path="/pay" component={Pay} />
          <Route exact path="/account" component={Account} />
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
        <IonTabButton tab="account" href="/account">
          <IonIcon icon={personCircle} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
