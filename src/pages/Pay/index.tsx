import type { RouteComponentProps } from 'react-router-dom';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { wallet, qrCode, receipt } from 'ionicons/icons';
import Scan from './Scan';
import Wallet from './Wallet';
import './style.scss';

const menuLinks = [
  {
    href: '/pay/scan',
    icon: qrCode,
    label: 'Scan to pay',
  },
  {
    href: '/pay/wallet',
    icon: wallet,
    label: 'Payment methods',
  },
  {
    href: '/pay/transactions',
    icon: receipt,
    label: 'Transactions',
  },
];

export default function Pay({ match }: RouteComponentProps) {
  const location = useLocation();

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu side="start" menuId="main" contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Pay</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {menuLinks.map(menuLink => (
                <IonItem
                  key={menuLink.href}
                  routerLink={menuLink.href}
                  className={location.pathname === menuLink.href ? 'active' : ''}>
                  <IonIcon icon={menuLink.icon} slot="start" />
                  <IonLabel>{menuLink.label}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonMenu>
        <IonContent id="main">
          <IonRouterOutlet>
            <Switch>
              <Route exact path={`${match.url}/scan`} component={Scan} />
              <Route exact path={`${match.url}/wallet`} component={Wallet} />
              <Route exact path={`${match.url}/transactions`} component={Scan} />

              {/* Fallback route */}
              <Route render={() => <Redirect to={`${match.url}/scan`} />} />
            </Switch>
          </IonRouterOutlet>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
}
