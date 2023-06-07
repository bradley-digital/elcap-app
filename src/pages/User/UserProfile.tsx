import type { Profile } from "hooks/useUser";
import { IonCol, IonGrid, IonRow } from "@ionic/react";

// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormUserAccount from "components/FormUserAccount/FormUserAccount";
import UserAccountActions from "components/UserAccountActions/UserAccountActions";
import DeleteUserModal from "components/DeleteUserModal/DeleteUserModal";

type Props = {
  profile: Profile;
};

export default function UserAccount({ profile }: Props) {
  return (
    <PageTemplate title="Profile" menuId="user">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormUserAccount profile={profile} />
            <UserAccountActions profile={profile} />
            <DeleteUserModal profile={profile} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
