import { useQuery } from "react-query";

// components
import {
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import ProfileCard from "components/ProfileCard/ProfileCard";
import FormAccount from "components/FormAccount/FormAccount";
import LogoutButton from "components/LogoutButton/LogoutButton";

// hooks
import useApi from "hooks/useApi";

export default function Account() {
  const { getUser } = useApi();
  const { isSuccess, data } = useQuery("userAccount", getUser);

  if (isSuccess) {
    return (
      <PageTemplate title="Account">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <ProfileCard profile={data} />
              <FormAccount profile={data} />
              <hr />
              <LogoutButton className="w-100">Logout</LogoutButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </PageTemplate>
    );
  }

  // Need better error state
  return null;
}
