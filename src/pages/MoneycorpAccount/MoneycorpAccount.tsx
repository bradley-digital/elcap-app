import { IonCol, IonGrid, IonRow } from "@ionic/react";

// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import type { MoneycorpAccount as MoneycorpAccountType } from "hooks/useMoneycorpAccount";
import MoneycorpAccountDetail from "components/MoneycorpAccountDetail/MoneycorpAccountDetail";
import { Profile } from "hooks/useUser";

type Props = {
  account: MoneycorpAccountType;
  users: Profile[];
};

export default function MoneycorpAccount({ account, users }: Props) {
  return (
    <PageTemplate title="Moneycorp" menuId="account">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="8" size-lg="6">
            <MoneycorpAccountDetail account={account} users={users} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageTemplate>
  );
}
