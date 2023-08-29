import { type ReactNode } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./PageTemplate.scss";
import NotificationButton from "components/NotificationButton/NotificationButton";
import classNames from "classnames";
import Notifications from "components/Notification/Notifications";
import { ReactComponent as LogoSvg } from "assets/elcapitanadvisors_logo.svg";

type Props = {
  children: ReactNode;
  menuId?: string;
  title: string;
  className?: string;
  showLogo?: boolean;
  [rest: string]: any;
};

export default function PageTemplate({
  children,
  menuId,
  title,
  showLogo = false,
  className = "",
  ...rest
}: Props) {
  return (
    <IonPage {...rest} className={classNames("PageTemplate", className)}>
      <IonHeader>
        <IonToolbar>
          {menuId && (
            <IonButtons slot="start">
              <IonMenuButton menu={menuId} />
            </IonButtons>
          )}
          {showLogo && (
            <div slot="start" className="PageTemplate__logo">
              <LogoSvg height={24} width={24} />
            </div>
          )}
          <IonTitle>{title}</IonTitle>
          <NotificationButton />
          <Notifications />
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}
