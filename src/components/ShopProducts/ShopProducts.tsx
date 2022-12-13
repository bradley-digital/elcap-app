import hash from "object-hash";

// components
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";

// styles
import "./ShopProducts.scss";

export type Product = {
  id: number;
  img: string;
  dispensary: string;
  name: string;
  price: string;
};

type Props = {
  products: Product[];
};

export default function ShopProducts({ products }: Props) {
  return (
    <IonGrid fixed className="ShopProducts">
      <IonRow>
        {products.map(({ img, dispensary, name, price, ...rest }) => (
          <IonCol
            key={hash(rest)}
            size="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            className="ShopProducts__Product"
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
      </IonRow>
    </IonGrid>
  );
}
