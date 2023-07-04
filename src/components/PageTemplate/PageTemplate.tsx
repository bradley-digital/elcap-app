import { type ReactNode } from "react";

import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { useNotification } from "hooks/useNotification";
import "./PageTemplate.scss";

type Props = {
  children: ReactNode;
  menuId?: string;
  title: string;
  [rest: string]: any;
};

export default function PageTemplate({
  children,
  menuId,
  title,
  ...rest
}: Props) {
  const router = useIonRouter();
  const { unViewedCountIsSucces, unviewedNotificationsCount } = useNotification(
    {}
  );
  return (
    <IonPage {...rest} className="PageTemplate">
      <IonHeader>
        <IonToolbar>
          {menuId && (
            <IonButtons slot="start">
              <IonMenuButton menu={menuId} />
            </IonButtons>
          )}
          <IonTitle>{title}</IonTitle>

          {router.routeInfo.pathname !== "/notifications" && (
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  router.push("/notifications");
                }}
                color="dark"
                className="PageTemplate__notification--button"
                slot="end"
              >
                <IonIcon
                  icon={notificationsOutline}
                  size="large"
                  className="PageTemplate__notification--bell"
                />
                {unViewedCountIsSucces && unviewedNotificationsCount > 0 && (
                  <IonBadge slot="start" color="tertiary">
                    {unviewedNotificationsCount}
                  </IonBadge>
                )}
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}
