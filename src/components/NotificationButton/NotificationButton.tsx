import {
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { useNotification } from "hooks/useNotification";
import { notificationsOutline } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
export default function NotificationButton({ setIsOpen }: Props) {
  const { unViewedCountIsSucces, unviewedNotificationsCount } = useNotification(
    {}
  );
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
