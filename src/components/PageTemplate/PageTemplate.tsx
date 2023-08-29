import { type ReactNode } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./PageTemplate.scss";
import NotificationButton from "components/NotificationButton/NotificationButton";
import classNames from "classnames";
import Notifications from "components/Notification/Notifications";
import useUser from "hooks/useUser";
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
  const { profile } = useUser();
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
          {profile && (
            <IonText slot="end" className="hidden-md">
              {`${profile.firstName} ${profile.lastName}`}
            </IonText>
          )}
          <IonButtons slot="end">
            <NotificationButton />
          </IonButtons>
          <Notifications />
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}
