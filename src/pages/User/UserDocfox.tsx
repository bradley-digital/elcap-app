import type { Profile } from "hooks/useUser";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormUserDocfox from "components/FormUserDocfox/FormUserDocfox";

type Props = {
  profile: Profile;
};

export default function UserDocfox({ profile }: Props) {
  return (
    <PageTemplate title="DocFox" menuId="user">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormUserDocfox profile={profile} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
