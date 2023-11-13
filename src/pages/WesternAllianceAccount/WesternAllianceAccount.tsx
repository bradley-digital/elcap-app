import type { Account } from "hooks/useWesternAllianceAccount";
import { IonCol, IonGrid, IonRow } from "@ionic/react";

// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import FormWesternAlliance from "components/FormWesternAlliance/FormWesternAlliance";
import WesternAllianceAccountActions from "components/WesternAllianceAccountActions/WesternAllianceAccountActions";

type Props = {
  account: Account;
};

export default function WesternAllianceAccount({ account }: Props) {
  return (
    <PageTemplate title="Western Alliance" menuId="account">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <FormWesternAlliance account={account} />
            <hr />
            <WesternAllianceAccountActions account={account} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
