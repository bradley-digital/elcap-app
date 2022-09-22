import hash from "object-hash";

// components
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
} from "@ionic/react";

// consts
import { products } from "pages/Shop/consts";

// styles
import styles from "./ShopProduct.module.scss";

export default function ShopProduct() {
  return (
    <>
      {products.map(({ img, dispensary, name, price, ...rest }) => (
        <IonCol
          key={hash(rest)}
          size="12"
          size-sm="6"
          size-md="4"
          size-lg="3"
          className={styles.ShopProduct}
        >
          <IonCard>
            <img src={img} alt={name} />
            <IonCardHeader>
              <IonCardSubtitle>{dispensary}</IonCardSubtitle>
              <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{price}</IonCardContent>
          </IonCard>
        </IonCol>
      ))}
    </>
  );
}
