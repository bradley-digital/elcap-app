import type { Profile } from "hooks/useUser";
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/westernAllianceModal";
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
import WesternAllianceListModal from "components/WesternAllianceListModal/WesternAllianceListModal";
import { add } from "ionicons/icons";

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
            <WesternAllianceListModal />
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
