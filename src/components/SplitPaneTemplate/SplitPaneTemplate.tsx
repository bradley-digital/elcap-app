import type { MenuLink } from "components/MenuLinks/MenuLinks";
import type { ReactNode } from "react";

// components
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import MenuLinks from "components/MenuLinks/MenuLinks";

type Props = {
  className?: string;
  children: ReactNode;
  menuLinks: MenuLink[];
  menuId: string;
  title: string;
};

export default function SplitPaneTemplate({
  className,
  children,
  menuLinks,
  menuId,
  title,
}: Props) {
  return (
    <IonPage className={className}>
      <IonSplitPane contentId={menuId}>
        <IonMenu side="start" menuId={menuId} contentId={menuId}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <MenuLinks menuLinks={menuLinks} />
          </IonContent>
        </IonMenu>
        <IonContent id={menuId}>
          {children}
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
}
