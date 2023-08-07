import {
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  useIonRouter,
} from "@ionic/react";
import { useNotification } from "hooks/useNotification";
import { notificationsOutline } from "ionicons/icons";

export default function NotificationButton() {
  const router = useIonRouter();
  const { unViewedCountIsSucces, unviewedNotificationsCount } = useNotification(
    {}
  );
  return (
    <IonButtons slot="end">
      <IonButton
        onClick={() => {
          router.push("/notifications");
        }}
        color="dark"
        className="PageTemplate__notification--button"
        slot="end"
      >
        <IonIcon
          icon={notificationsOutline}
          size="large"
          className="PageTemplate__notification--bell"
        />
        {unViewedCountIsSucces && unviewedNotificationsCount > 0 && (
          <IonBadge slot="start" color="tertiary">
            {unviewedNotificationsCount}
          </IonBadge>
        )}
      </IonButton>
    </IonButtons>
  );
}
