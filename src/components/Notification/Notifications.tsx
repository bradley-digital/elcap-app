import { useEffect } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
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

export default function Notifications() {
  const { notifications, fetchNextPage, meta, patchAllNotificationsToViewed } =
    useNotification({});
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
        }
      );
    };

    const notificationNsp = socket("/notification");
    notificationNsp.on("notification:new", listener);
    return () => {
      patchAllNotificationsToViewed();
      notificationNsp.disconnect();
    };
  }, []);

  return (
    <IonContent className="Notifications">
      {isEmpty(notifications?.pages[0]) ? (
        <IonContent className="ion-text-center ion-padding">
          <IonText color="medium">No notifications</IonText>
        </IonContent>
      ) : (
        <IonList>
          {notifications?.pages?.map((page) => {
            return page.map((item: INotification) => (
              <IonItem
                key={item.id}
                className={`${
                  item.seen ? "Notifications__seen" : "Notifications__unseen"
                }`}
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
          // setTimeout(() => ev.target.complete(), 500);
          ev.target.complete();
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
}
