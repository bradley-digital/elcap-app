import { useEffect, type ReactNode } from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import {  getUserId } from "hooks/useTokens";
import { socket } from "lib/socket";

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
  const userId = getUserId();
  useEffect(() => {
    const listener = (value: any) => {
      // push into list messages a new one
      console.log({ value });
    };
    socket.on(userId, listener);

    return () => {
      socket.off(userId, listener);
    };
  }, [userId]);

  return (
    <IonPage {...rest}>
      <IonHeader>
        <IonToolbar>
          {menuId && (
            <IonButtons slot="start">
              <IonMenuButton menu={menuId} />
            </IonButtons>
          )}
          <IonTitle>{title}</IonTitle>

          <IonButtons slot="end">
            <IonIcon icon={notificationsOutline} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}