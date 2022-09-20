import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bag, card, personCircle } from 'ionicons/icons';
import { useCookies } from 'react-cookie';

/* Pages */
import Account from 'pages/Account/Account';
import Example from 'pages/Example/Example';
import Login from 'pages/Login/Login';
import Pay from 'pages/Pay/Pay';
import Register from 'pages/Register/Register';
import Shop from 'pages/Shop/Shop';
import Loader from 'components/Loader/Loader';

/* Theme variables */
import 'theme/global.scss';
import 'theme/variables.scss';
import 'theme/utilities.scss';

setupIonicReact();

export default function App() {
  const [cookies] = useCookies(['user']);

  return (
    <IonApp>
      {cookies.user === 'admin' ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Route path="/pay" component={Pay} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/example" component={Example} />
                <Route exact path="/loader" component={Loader} />

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
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              {/* Fallback route */}
              <Route render={() => <Redirect to="/login" />} />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
}
