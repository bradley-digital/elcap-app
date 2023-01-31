import { useLocation } from "react-router-dom";
import hash from "object-hash";

// components
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
} from "@ionic/react";

export type MenuLink = {
  id: number;
  icon: string;
  href: string;
  label: string;
};

type Props = {
  menuLinks: MenuLink[];
};

export default function MenuLinks({ menuLinks }: Props) {
  const { pathname } = useLocation();
  return (
    <IonList>
      {menuLinks.map(({ href, icon, id, label }) => (
        <IonMenuToggle key={hash(id)} menu="main" autoHide={false}>
          <IonItem
            routerLink={href}
            className={pathname === href ? "active" : ""}
          >
            <IonIcon icon={icon} slot="start" />
            <IonLabel>{label}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ))}
    </IonList>
  );
}
