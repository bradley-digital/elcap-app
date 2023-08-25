import "./SplitPaneTemplate.scss";
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
import { ReactComponent as LogoSvg } from "assets/elcapitanadvisors_logo.svg";
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
    <IonPage {...rest} className="SplitPaneTemplate">
      <IonSplitPane contentId={menuId}>
        <IonMenu side="start" menuId={menuId} contentId={menuId}>
          <IonHeader>
            <IonToolbar>
              <div slot="start" className="SplitPaneTemplate__logo">
                <LogoSvg height={24} width={24} />
              </div>
              <IonTitle slot="start">{title}</IonTitle>
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
