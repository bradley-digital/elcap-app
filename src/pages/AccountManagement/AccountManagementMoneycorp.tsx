import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/moneycorpModal";
import PageTemplate from "components/PageTemplate/PageTemplate";

// hooks
import useMoneycorpAccount from "hooks/useMoneycorpAccount";

// icons
import { add } from "ionicons/icons";
import MoneycorpList from "components/MoneycorpList/MoneycorpList";
import MoneycorpListModal from "components/MoneycorpListModal/MoneycorpListModal";

export default function AccountManagementMoneycorp() {
  const { accountsIsSuccess, accounts } = useMoneycorpAccount();

  const [, setIsOpen] = useAtom(isOpenAtom);

  function openModal() {
    setIsOpen(true);
  }

  if (accountsIsSuccess && typeof accounts !== "undefined") {
    return (
      <PageTemplate title="Moneycorp" menuId="account-moneycorp">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <MoneycorpList />
              <MoneycorpListModal />
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

  // Need better error state
  return null;
}
