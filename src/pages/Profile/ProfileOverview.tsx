// components
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PageTemplate from "components/PageTemplate/PageTemplate";
import ProfileCard from "components/ProfileCard/ProfileCard";
import FormAccount from "components/FormAccount/FormAccount";
import LogoutButton from "components/LogoutButton/LogoutButton";
import ProfileAccountSecurity from "components/ProfileAccountSecurity/ProfileAccountSecurity";

// hooks
import useUser from "hooks/useUser";

export default function Profile() {
  const { profile } = useUser();

  if (typeof profile !== "undefined") {
    return (
      <PageTemplate
        title="Overview"
        showLogo={profile.role === "ADMIN"}
        menuId="profile"
      >
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size-md="8" size-lg="6">
              <ProfileCard profile={profile} />
              <FormAccount profile={profile} />
              <ProfileAccountSecurity />
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
