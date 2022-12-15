import type { Profile } from "hooks/useUser";

// components
import { IonCard, IonText } from "@ionic/react";

import "./ProfileCard.scss";

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  const { createdAt, firstName, lastName, userName } = profile;
  const joined = new Date(createdAt).toLocaleString("en-US");

  return (
    <IonCard className="ProfileCard">
      <IonText className="ProfileCard__text">
        <h1 className="ProfileCard__title">{`${firstName} ${lastName}`}</h1>
        <h3>{userName}</h3>
        <p>Joined: {joined}</p>
      </IonText>
    </IonCard>
  );
}
