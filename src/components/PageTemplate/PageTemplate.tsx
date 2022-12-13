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
  hasMenu?: boolean;
  title: string;
};

export default function PageTemplate({
  className,
  children,
  hasMenu = false,
  title
}: Props) {
  return (
    <IonPage className={className}>
      <IonHeader>
        <IonToolbar>
          {hasMenu && (
            <IonButtons slot="start">
              <IonMenuButton menu="main" />
            </IonButtons>
          )}
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}
