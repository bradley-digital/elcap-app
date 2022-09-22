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
import styles from "./Shop.module.scss";

export default function Shop() {
  return (
    <IonPage className={styles.shopPage}>
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
