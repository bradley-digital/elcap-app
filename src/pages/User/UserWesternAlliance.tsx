import type { Profile } from "hooks/useUser";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormUserWesternAllianceAccounts from "components/FormUserWesternAllianceAccounts/FormUserWesternAllianceAccounts";

type Props = {
  profile: Profile;
};

export default function UserWesternAlliance({ profile }: Props) {
  return (
    <PageTemplate title="Western Alliance" menuId="user">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormUserWesternAllianceAccounts profile={profile} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
