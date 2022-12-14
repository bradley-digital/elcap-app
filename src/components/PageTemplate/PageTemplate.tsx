import type { ReactNode } from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

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
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}
