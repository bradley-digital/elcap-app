import { IonButtons, IonButton, IonIcon, IonBadge } from "@ionic/react";
import { useAtom } from "jotai";
import { useNotification } from "hooks/useNotification";
import { notificationsOutline } from "ionicons/icons";
import { isOpenAtom } from "atoms/notificationModal";

export default function NotificationButton() {
  const [, setIsOpen] = useAtom(isOpenAtom);

  const { unViewedCountIsSucces, unviewedNotificationsCount } =
    useNotification();
  return (
    <IonButtons slot="end">
      <IonButton
        onClick={() => {
          setIsOpen(true);
        }}
        color="dark"
        className="PageTemplate__notification--button"
        slot="end"
      >
        <IonIcon
          icon={notificationsOutline}
          className="PageTemplate__notification--bell"
        />
        {unViewedCountIsSucces && unviewedNotificationsCount > 0 && (
          <IonBadge slot="start" color="tertiary">
            {unviewedNotificationsCount <= 99
              ? unviewedNotificationsCount.toString()
              : "99+"}
          </IonBadge>
        )}
      </IonButton>
    </IonButtons>
  );
}
