import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { wallet, qrCode, receipt } from 'ionicons/icons';
import Scan from './Scan';
import Wallet from './Wallet';
import './style.scss';

const tabs = {
  scan: 'Scan to pay',
  wallet: 'Payment methods',
  transactions: 'Transactions',
};

const menuLinks = [
  {
    href: '/pay/scan',
    icon: qrCode,
    label: tabs.scan,
  },
  {
    href: '/pay/wallet',
    icon: wallet,
    label: tabs.wallet,
  },
  {
    href: '/pay/transactions',
    icon: receipt,
    label: tabs.transactions,
  },
];

type PaySubRoutes = 'scan' | 'wallet' | 'transactions';

type SubRoutes = {
  [key in PaySubRoutes]: {
    title: string;
    element: ReactNode;
  }
}

const subroutes: SubRoutes = {
  'scan': {
    title: tabs.scan,
    element: <Scan />,
  },
  'wallet': {
    title: tabs.wallet,
    element: <Wallet />,
  },
  'transactions': {
    title: tabs.transactions,
    element: <Scan />,
  },
};

export default function Pay() {
  const location = useLocation();
  const { id }: { id: PaySubRoutes } = useParams();
  const [paramId, setParamId] = useState<PaySubRoutes>('scan');

  useEffect(() => {
    if (typeof id === 'string') {
      setParamId(id);
    }
  }, [id]);

  console.log(paramId);

  return (
    <IonContent>
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
                  href={menuLink.href}
                  className={location.pathname === menuLink.href ? 'active' : ''}>
                  <IonIcon icon={menuLink.icon} slot="start" />
                  <IonLabel>{menuLink.label}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonMenu>
        <IonPage id="main">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton menu="main" />
              </IonButtons>
              <IonTitle>{subroutes[paramId]?.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            {subroutes[paramId]?.element}
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonContent>
  );
}
