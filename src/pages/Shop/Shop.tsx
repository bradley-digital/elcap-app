// components
import {
  IonGrid,
  IonRow,
} from "@ionic/react";
import ShopProduct from "components/Shop/ShopProduct";
import PageTemplate from "components/PageTemplate/PageTemplate";

// styles
import "./Shop.scss";

export default function Shop() {
  return (
    <PageTemplate title="Shop" className="Shop">
      <IonGrid fixed>
        <IonRow>
          <ShopProduct />
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
