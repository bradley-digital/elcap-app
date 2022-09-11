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
  IonDatetime,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonModal,
  IonPage,
  IonPopover,
  IonProgressBar,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSlide,
  IonSlides,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonToast,
} from '@ionic/react';
import { add, star } from 'ionicons/icons';
import './style.scss';

export default function Example() {
  const [present] = useIonActionSheet();
  const [presentIonToast] = useIonToast();
  const [showAlert, setShowAlert] = useState(false);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    presentIonToast({
      message: 'Hello World!',
      duration: 1500,
      position: position
    });
  };

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
                    <img alt="placeholder" src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />
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
                    <img alt="placeholder" src="https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png" />
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
              <IonRow>
                <IonCol>
                  <IonDatetime />
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Text input</IonLabel>
                    <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(e.detail.value!)} />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonButton onClick={() => setIsOpen(true)}>Open Modal</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton id="click-trigger">Left-Click Me</IonButton>
                  <IonPopover trigger="click-trigger" triggerAction="click">
                    <IonContent class="ion-padding">Hello World!</IonContent>
                  </IonPopover>
                </IonCol>
                <IonCol>
                  <IonProgressBar type="indeterminate" />
                </IonCol>
                <IonCol>
                  <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus" />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-md="4">
                  <IonSlides pager={true} options={{ initialSlide: 0, speed: 400 }}>
                    <IonSlide>
                      <h1>Slide 1</h1>
                    </IonSlide>
                    <IonSlide>
                      <h1>Slide 2</h1>
                    </IonSlide>
                    <IonSlide>
                      <h1>Slide 3</h1>
                    </IonSlide>
                  </IonSlides>
                </IonCol>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonSelect placeholder="Select fruit">
                        <IonSelectOption value="apples">Apples</IonSelectOption>
                        <IonSelectOption value="oranges">Oranges</IonSelectOption>
                        <IonSelectOption value="bananas">Bananas</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" onClick={() => presentToast('bottom')}>Present Toast</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      </IonSplitPane>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
            reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
            Eaque, dicta.
          </p>
        </IonContent>
      </IonModal>
    </IonContent>
  );
}
