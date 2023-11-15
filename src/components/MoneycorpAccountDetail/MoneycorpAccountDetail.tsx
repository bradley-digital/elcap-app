import {
  IonButton,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
} from "@ionic/react";
import { MoneycorpAccount } from "hooks/useMoneycorpAccount";
import { Profile } from "hooks/useUser";
import { arrowBack } from "ionicons/icons";

type Props = {
  account: MoneycorpAccount;
  users: Profile[];
};

export default function MoneycorpAccountDetail({ account, users }: Props) {
  const {
    id,
    attributes: { accountName, accountReference, address },
  } = account;
  const { city, country, stateProvince, postZipCode } = address;
  const accountAddress = `${city}, ${stateProvince}, ${postZipCode}, ${country}`;

  const user = users?.find((user) => {
    const { moneycorpAccount } = user;
    if (moneycorpAccount?.accountId === id) {
      return user;
    }
  });

  return (
    <>
      <IonButton fill="clear" routerLink="/account-management/moneycorp">
        <IonIcon slot="start" icon={arrowBack} />
        All accounts
      </IonButton>
      <IonList>
        <IonItemGroup>
          <IonItem>
            <IonLabel>
              <h3>Client:</h3>
              <p>
                {user ? `${user?.firstName} ${user?.lastName}` : "Not linked"}
              </p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Account Name:</h3>
              <p>{accountName}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Account Number:</h3>
              <p>{accountReference}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Address:</h3>
              <p>{accountAddress}</p>
            </IonLabel>
          </IonItem>
        </IonItemGroup>
      </IonList>
    </>
  );
}
