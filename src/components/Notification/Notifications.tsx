import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { socket } from "lib/socket";
import { get, isEmpty, update } from "lodash";
import { useAtom } from "jotai";
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
} from "@ionic/react";
import { isOpenAtom } from "atoms/userListModal";
import {
  INotification,
  notificationsQueryKey,
  unviewedNotificationsCountQueryKey,
  useNotification,
} from "hooks/useNotification";
import "./Notifications.scss";
import cn from "classnames";
import { getTimeAgo } from "lib/getTimeAgo";

export default function Notifications() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const {
    notifications,
    fetchNextPage,
    meta,
    patchAllNotificationsToViewed,
    patchNotificationToRead,
  } = useNotification();

  const queryClient = useQueryClient();

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
        },
      );
    };

    const notificationNsp = socket("/notification");
    notificationNsp.on("notification:new", listener);
    return () => {
      notificationNsp.disconnect();
    };
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      patchAllNotificationsToViewed();
    }
  }, [isOpen]);

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
          <IonText className="Notifications__none" color="medium">
            No notifications
          </IonText>
        ) : (
          <IonList>
            {notifications?.pages?.map((page) => {
              return page.map((item: INotification) => (
                <IonItem
                  key={item.id}
                  className={cn(
                    "Notifications__item",
                    item.read ? "Notifications__read" : "Notifications__unread",
                  )}
                  href={item.link || undefined}
                  onClick={() => {
                    patchNotificationToRead({ id: item.id });
                  }}
                >
                  <div>
                    <IonLabel>{item.message}</IonLabel>
                    <IonText
                      color="medium"
                      className="Notifications__messageTimeStamp"
                    >
                      {getTimeAgo(item.createdAt.toString())}
                    </IonText>
                  </div>
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
