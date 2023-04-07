import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/westernAllianceModal";
import PageTemplate from "components/PageTemplate/PageTemplate";
import WesternAllianceList from "components/WesternAllianceList/WesternAllianceList";

// hooks
import useWesternAlliance from "hooks/useWesternAllianceAccount";

// icons
import { add } from "ionicons/icons";

export default function WesternAllianceManagement() {
  const { accountsIsSuccess, accounts } = useWesternAlliance();

  console.log("accountsIsSuccess", accounts);
  const [, setIsOpen] = useAtom(isOpenAtom);

  function openModal() {
    setIsOpen(true);
  }

  if (accountsIsSuccess && typeof accounts !== "undefined") {
    return (
      <PageTemplate title="Western Alliance Management">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <WesternAllianceList accounts={accounts} />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color={"secondary"} onClick={openModal}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </PageTemplate>
    );
  }

  // Need better error state
  return null;
}
