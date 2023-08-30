import "./ProfileItem.scss";
import { IonItem, IonLabel, IonButton } from "@ionic/react";

type Props = {
  label: string;
  onClick?: () => void;
};

export default function ProfileItem({ label, onClick }: Props) {
  return (
    <IonItem className="ProfileItem">
      <IonLabel className="ProfileItem__label">{label}</IonLabel>
      <IonButton onClick={onClick}>View</IonButton>
    </IonItem>
  );
}
