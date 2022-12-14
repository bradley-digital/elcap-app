import type { Profile } from "hooks/useApi";

// components
import {
  IonCard,
  IonText,
} from "@ionic/react";

import "./ProfileCard.scss";

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  const { createdAt, firstName, lastName, userName} = profile;
  const joined = new Date(createdAt).toLocaleString("en-US");

  return (
    <IonCard className="ProfileCard ion-padding">
      <IonText className="ion-text-center">
        <h1 className="ProfileCard__title">{`${firstName} ${lastName}`}</h1>
        <h3>{userName}</h3>
        <p>Joined: {joined}</p>
      </IonText>
    </IonCard>
  );
}
