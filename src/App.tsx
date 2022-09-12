import { Redirect, Route } from 'react-router-dom';
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
import { qrCode } from 'ionicons/icons';
import { useCookies } from 'react-cookie';


/* Pages */
import Pay from './pages/Pay';
import Example from './pages/Example';
import Login from './pages/Login';
import Register from './pages/Register';

/* Theme variables */
import './theme/global.scss';
import './theme/variables.scss';
import './theme/utilities.scss';

setupIonicReact();

export default function App() {
  const [cookies, setCookie] = useCookies(['user']);
  let loggedIn = false;
  if (cookies.user === 'admin') {
    loggedIn = true;
  }
  return (
    <IonApp>
      {loggedIn ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/pay">
                <Pay />
              </Route>
              <Route exact path="/example">
                <Example />
              </Route>
              <Route exact path="/">
                <Redirect to="/pay" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="pay" href="/pay">
                <IonIcon icon={qrCode} />
                <IonLabel>Pay</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
}
