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
  className?: string;
  children: ReactNode;
  menuId?: string;
  title: string;
};

export default function PageTemplate({
  className,
  children,
  menuId,
  title
}: Props) {
  return (
    <IonPage className={className}>
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
