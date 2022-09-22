import { useLocation } from "react-router-dom";
import hash from "object-hash";

// components
import { IonIcon, IonItem, IonLabel, IonMenuToggle } from "@ionic/react";

// consts
import { menuLinks } from "pages/Pay/consts";

// styles
import styles from "./PayMenuLinks.module.scss";

export default function PayMenuLinks() {
  const { pathname } = useLocation();
  return (
    <>
      {menuLinks.map(({ href, icon, label, ...rest }) => (
        <IonMenuToggle key={hash(rest)} menu="main" autoHide={false}>
          <IonItem
            routerLink={href}
            className={pathname === href ? styles.active : ""}
          >
            <IonIcon icon={icon} slot="start" />
            <IonLabel>{label}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ))}
    </>
  );
}
