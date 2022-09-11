import { useState } from 'react';
import {
  IonAlert,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSplitPane,
  IonText,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from '@ionic/react';
import { star } from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [present, dismiss] = useIonActionSheet();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <IonContent>
      <IonSplitPane contentId="main">
        <IonMenu side="start" menuId="main" contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonPage id="main">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton menu="main" />
              </IonButtons>
              <IonTitle>Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Tab 1</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={() =>
                      present({
                        buttons: [{ text: 'Ok' }, { text: 'Cancel' }],
                        header: 'Action Sheet',
                      })
                    }
                  >
                    Show action sheet
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton onClick={() => setShowAlert(true)}>Show alert</IonButton>
                  <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Alert"
                    subHeader="Important message"
                    message="This is an alert!"
                    buttons={['OK']}
                  />
                </IonCol>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonBadge slot="end">500</IonBadge>
                      <IonLabel>Followers</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonBadge slot="end">0</IonBadge>
                      <IonLabel>Fs Given</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton expand="full">Full Button</IonButton>
                  <IonButton expand="block">Block Button</IonButton>
                  <IonButton shape="round">Round Button</IonButton>
                  <IonButton expand="full" fill="outline">Outline + Full</IonButton>
                  <IonButton expand="block" fill="outline">Outline + Block</IonButton>
                  <IonButton shape="round" fill="outline">Outline + Round</IonButton>
                  <IonButton>
                    <IonIcon slot="start" icon={star} />
                    Left Icon
                  </IonButton>
                  <IonButton size="large">Large</IonButton>
                  <IonButton>Default</IonButton>
                  <IonButton size="small">Small</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-md="6">
                  <IonCard>
                    <img src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />
                    <IonItem>
                      <IonIcon icon={star} slot="start" />
                      <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                      <IonButton fill="outline" slot="end">View</IonButton>
                    </IonItem>

                    <IonCardContent>
                      This is content, without any paragraph or header tags,
                      within an ion-cardContent element.
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size-md="6">
                  <IonCard>
                    <img src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />
                    <IonCardHeader>
                      <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                      <IonCardTitle>Card Title</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                      Keep close to Nature's heart... and break clear away, once in awhile,
                      and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonContent>
  );
};

export default Tab1;
