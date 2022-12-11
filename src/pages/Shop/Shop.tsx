// components
import {
  IonContent,
  IonHeader,
  IonGrid,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ShopProduct from "components/Shop/ShopProduct";

// styles
import "./Shop.scss";

export default function Shop() {
  return (
    <IonPage className="Shop">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            <ShopProduct />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
