import "./MenuLinks.scss";
import { useLocation } from "react-router-dom";
import hash from "object-hash";

// components
import {
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
} from "@ionic/react";

export type ChildLink = {
  id: number;
  href: string;
  label: string;
};

export type MenuLink = {
  id: number;
  icon: string;
  label: string;
  href?: string;
  menuLinks?: ChildLink[];
};

type Props = {
  menuId: string;
  menuLinks: MenuLink[];
};

export default function MenuLinks({ menuId, menuLinks }: Props) {
  const { pathname } = useLocation();
  return (
    <IonList className="MenuLinks">
      {menuLinks.map(({ href, icon, id, label, menuLinks: childLinks }) =>
        childLinks ? (
          <IonAccordionGroup key={hash(id)}>
            <IonAccordion>
              <IonItem slot="header">
                <IonIcon icon={icon} slot="start" />
                <IonLabel>{label}</IonLabel>
              </IonItem>
              <div slot="content" className="MenuLinks__childLinks">
                {childLinks.map(({ href: childHref, id, label }) => (
                  <IonItem
                    key={hash(id)}
                    routerLink={childHref}
                    lines="none"
                    className={pathname === childHref ? "active" : ""}
                  >
                    <IonLabel>{label}</IonLabel>
                  </IonItem>
                ))}
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        ) : (
          <IonMenuToggle key={hash(id)} menu={menuId} autoHide={false}>
            <IonItem
              routerLink={href}
              className={pathname === href ? "active" : ""}
            >
              <IonIcon icon={icon} slot="start" />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        ),
      )}
    </IonList>
  );
}
