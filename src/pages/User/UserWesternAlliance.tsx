import type { Profile } from "hooks/useUser";
import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormUserWesternAllianceAccounts from "components/FormUserWesternAllianceAccounts/FormUserWesternAllianceAccounts";
import { add } from "ionicons/icons";
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/usersWesternAllianceModal";
import UsersWesternAllianceModal from "components/UserWesternAllianceModal/UserWesternAllianceModal";

type Props = {
  profile: Profile;
};

export default function UserWesternAlliance({ profile }: Props) {
  const [, setIsOpen] = useAtom(isOpenAtom);

  function openModal() {
    setIsOpen(true);
  }
  return (
    <PageTemplate title="Western Alliance accounts" menuId="user">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormUserWesternAllianceAccounts profile={profile} />
            <UsersWesternAllianceModal />
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={openModal}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </PageTemplate>
  );
}
