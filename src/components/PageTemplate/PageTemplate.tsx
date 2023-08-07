import { type ReactNode } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./PageTemplate.scss";
import NotificationButton from "components/NotificationButton/NotificationButton";
import classNames from "classnames";

type Props = {
  children: ReactNode;
  menuId?: string;
  title: string;
  className: string;
  [rest: string]: any;
};

export default function PageTemplate({
  children,
  menuId,
  title,
  className,
  ...rest
}: Props) {
  const router = useIonRouter();
  return (
    <IonPage {...rest} className={classNames("PageTemplate", className)}>
      <IonHeader>
        <IonToolbar>
          {menuId && (
            <IonButtons slot="start">
              <IonMenuButton menu={menuId} />
            </IonButtons>
          )}
          <IonTitle>{title}</IonTitle>

          {router.routeInfo.pathname !== "/notifications" && (
            <NotificationButton />
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}
