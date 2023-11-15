import type { Profile } from "hooks/useUser";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormUserMoneycorpAccount from "components/FormUserMoneycorpAccounts/FormUserMoneycorpAccounts";

type Props = {
  profile: Profile;
};

export default function UserMoneycorp({ profile }: Props) {
  return (
    <PageTemplate title="Moneycorp Accounts" menuId="user">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormUserMoneycorpAccount profile={profile} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
