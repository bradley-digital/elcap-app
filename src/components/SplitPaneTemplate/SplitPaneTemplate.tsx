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
  children: ReactNode;
  menuLinks: MenuLink[];
  menuId: string;
  title: string;
  [rest: string]: any;
};

export default function SplitPaneTemplate({
  children,
  menuLinks,
  menuId,
  title,
  ...rest
}: Props) {
  return (
    <IonPage {...rest}>
      <IonSplitPane contentId={menuId}>
        <IonMenu side="start" menuId={menuId} contentId={menuId}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <MenuLinks menuId={menuId} menuLinks={menuLinks} />
          </IonContent>
        </IonMenu>
        <IonContent id={menuId}>{children}</IonContent>
      </IonSplitPane>
    </IonPage>
  );
}
