import "./ProfileItem.scss";
import { IonItem, IonLabel, IonButton } from "@ionic/react";

type Props = {
  label: string;
  onClick?: () => void;
  buttonName?: string;
};

export default function ProfileItem({ label, onClick, buttonName }: Props) {
  return (
    <IonItem className="ProfileItem">
      <IonLabel className="ProfileItem__label">{label}</IonLabel>
      <IonButton onClick={onClick}>{buttonName || "View"}</IonButton>
    </IonItem>
  );
}
