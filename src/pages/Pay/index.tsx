import type { RouteComponentProps } from 'react-router-dom';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import Transactions from './Transactions';
import Loader from '../../components/Loader';
import './style.scss';

type MenuLink = {
  icon: string;
  href: string;
  label: string;
};

const menuLinks: MenuLink[] = [
  {
    icon: qrCode,
    href: '/pay/scan',
    label: 'Scan to pay',
  },
  {
    icon: wallet,
    href: '/pay/wallet',
    label: 'Payment methods',
  },
  {
    icon: receipt,
    href: '/pay/transactions',
    label: 'Transactions',
  },
];

export default function Pay({ match }: RouteComponentProps) {
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true)

   useEffect(() => {
     setTimeout(() => setLoading(false), 850)
   }, [])


  return (
    <>
    {loading === false? (
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
                {menuLinks.map(({ href, icon, label }) => (
                  <IonItem
                    key={href}
                    routerLink={href}
                    className={pathname === href ? 'active' : ''}>
                    <IonIcon icon={icon} slot="start" />
                    <IonLabel>{label}</IonLabel>
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
                <Route exact path={`${match.url}/transactions`} component={Transactions} />

                {/* Fallback route */}
                <Route render={() => <Redirect to={`${match.url}/scan`} />} />
              </Switch>
            </IonRouterOutlet>
          </IonContent>
        </IonSplitPane>
      </IonPage>
    ) : (
      <Loader/>
    )}
    </>
  );
}
