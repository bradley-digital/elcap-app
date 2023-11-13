import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";

// hooks
import useMoneycorpAccount from "hooks/useMoneycorpAccount";

// icons
import MoneycorpList from "components/MoneycorpList/MoneycorpList";

export default function AccountManagementMoneycorp() {
  const { accountsIsSuccess, accounts } = useMoneycorpAccount();

  if (accountsIsSuccess && typeof accounts !== "undefined") {
    return (
      <PageTemplate title="Moneycorp" menuId="account-moneycorp">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <MoneycorpList />
            </IonCol>
          </IonRow>
        </IonGrid>
      </PageTemplate>
    );
  }

  // Need better error state
  return null;
}
