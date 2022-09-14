import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonGrid,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './style.scss';

type Product = {
  img: string;
  dispensary: string;
  name: string;
  price: string;
};

const cannabis1 = '/assets/cannabis1.webp';
const cannabis2 = '/assets/cannabis2.jpg';
const cannabis3 = '/assets/cannabis3.jpg';

const products: Product[] = [
  {
    img: cannabis1,
    dispensary: 'The Gold Leaf',
    name: 'Colorado Cream Soda',
    price: '$35.00',
  },
  {
    img: cannabis2,
    dispensary: 'Brillo',
    name: 'Northern Lights Delta 8 THC Vape',
    price: '$20.00',
  },
  {
    img: cannabis3,
    dispensary: 'Green Cross',
    name: 'Koko Nuggz - Glazed Donut',
    price: '$45.00',
  },
  {
    img: cannabis1,
    dispensary: 'The Gold Leaf',
    name: 'Colorado Cream Soda',
    price: '$35.00',
  },
  {
    img: cannabis2,
    dispensary: 'Brillo',
    name: 'Northern Lights Delta 8 THC Vape',
    price: '$20.00',
  },
  {
    img: cannabis3,
    dispensary: 'Green Cross',
    name: 'Koko Nuggz - Glazed Donut',
    price: '$45.00',
  },
  {
    img: cannabis1,
    dispensary: 'The Gold Leaf',
    name: 'Colorado Cream Soda',
    price: '$35.00',
  },
  {
    img: cannabis2,
    dispensary: 'Brillo',
    name: 'Northern Lights Delta 8 THC Vape',
    price: '$20.00',
  },
  {
    img: cannabis3,
    dispensary: 'Green Cross',
    name: 'Koko Nuggz - Glazed Donut',
    price: '$45.00',
  },
  {
    img: cannabis1,
    dispensary: 'The Gold Leaf',
    name: 'Colorado Cream Soda',
    price: '$35.00',
  },
  {
    img: cannabis2,
    dispensary: 'Brillo',
    name: 'Northern Lights Delta 8 THC Vape',
    price: '$20.00',
  },
  {
    img: cannabis3,
    dispensary: 'Green Cross',
    name: 'Koko Nuggz - Glazed Donut',
    price: '$45.00',
  },
  {
    img: cannabis1,
    dispensary: 'The Gold Leaf',
    name: 'Colorado Cream Soda',
    price: '$35.00',
  },
  {
    img: cannabis2,
    dispensary: 'Brillo',
    name: 'Northern Lights Delta 8 THC Vape',
    price: '$20.00',
  },
  {
    img: cannabis3,
    dispensary: 'Green Cross',
    name: 'Koko Nuggz - Glazed Donut',
    price: '$45.00',
  },
];

export default function Shop() {
  return (
    <IonPage className="shop-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid fixed>
          <IonRow>
            {products.map(({
              img,
              dispensary,
              name,
              price,
            }) => (
              <IonCol size="12" size-sm="6" size-md="4" size-lg="3">
                <IonCard>
                  <>{console.log(price)}</>
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
      </IonContent>
    </IonPage>
  );
}
