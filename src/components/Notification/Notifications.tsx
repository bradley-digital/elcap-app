import { Dispatch, SetStateAction, useEffect } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  INotification,
  notificationsQueryKey,
  unviewedNotificationsCountQueryKey,
  useNotification,
} from "hooks/useNotification";
import { get, isEmpty, update } from "lodash";
import "./Notifications.scss";
import { useQueryClient } from "react-query";
import { socket } from "lib/socket";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Notifications({ isOpen, setIsOpen }: Props) {
  const { notifications, fetchNextPage, meta, patchAllNotificationsToViewed, patchNotificationToSeen } =
    useNotification({});
  const queryClient = useQueryClient();
  const router = useIonRouter();

  useEffect(() => {
    const listener = (value: any) => {
      queryClient.setQueryData(notificationsQueryKey, (prev: any) => {
        const updated = update(prev, "pages[0]", (items) => {
          return [value, ...items];
        });
        return updated;
      });

      queryClient.setQueryData(
        unviewedNotificationsCountQueryKey,
        (prev?: number) => {
          return prev ? ++prev : 1;
        }
      );
    };

    const notificationNsp = socket("/notification");
    notificationNsp.on("notification:new", listener);
    return () => {
      notificationNsp.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      patchAllNotificationsToViewed();
    }
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <IonModal isOpen={isOpen} onWillDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closeModal}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        {isEmpty(notifications?.pages[0]) ? (
          <IonText color="medium">No notifications</IonText>
        ) : (
          <IonList>
            {notifications?.pages?.map((page) => {
              return page.map((item: INotification) => (
                <IonItem
                  key={item.id}
                  className={`${
                    item.seen ? "Notifications__seen" : "Notifications__unseen"
                  }`}
                  onClick={() => {
                    patchNotificationToSeen({id: item.id})
                    if (item.link) {
                      router.push(item.link);
                    }
                  }}
                >
                  <IonLabel>{item.message}</IonLabel>
                </IonItem>
              ));
            })}
          </IonList>
        )}

        <IonInfiniteScroll
          onIonInfinite={async (ev) => {
            if (get(meta, "hasNextPage")) {
              await fetchNextPage();
            }
            ev.target.complete();
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonModal>
  );
}
