import { useState } from "react";
import { IonAlert, IonList } from "@ionic/react";
import ProfileItem from "components/ProfileItem/ProfileItem";
import RecoveryCodes from "components/RecoveryCodes/RecoveryCodes";
import AuthenticatorApp from "components/AuthenticatorApp/AuthenticatorApp";
import useUser from "hooks/useUser";

export default function ProfileAccountSecurity() {
  const { hasRecoveryCodes } = useUser();

  const [openAuthenticatorSettings, setOpenAuthenticatorSettings] =
    useState(false);
  const [openRecoveryCodes, setOpenRecoveryCodes] = useState(false);
  const [openRecoveryCodeWarning, setOpenRecoveryCodeWarning] = useState(false);

  return (
    <IonList>
      <ProfileItem
        label="Authenticator app"
        onClick={() => {
          setOpenAuthenticatorSettings(true);
        }}
      />
      <ProfileItem
        label="Recovery codes"
        onClick={() => {
          if (hasRecoveryCodes) {
            setOpenRecoveryCodeWarning(true);
          } else {
            setOpenRecoveryCodes(true);
          }
        }}
      />
      <IonAlert
        isOpen={openRecoveryCodeWarning}
        header="Warning!"
        message="By opening this page, your current recovery codes will be invalidated and you will be given new ones."
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setOpenRecoveryCodeWarning(false);
            },
          },
          {
            text: "Proceed",
            role: "confirm",
            handler: () => {
              setOpenRecoveryCodes(true);
            },
          },
        ]}
        onDidDismiss={() => setOpenRecoveryCodeWarning(false)}
      />
      {openAuthenticatorSettings && (
        <AuthenticatorApp
          open={openAuthenticatorSettings}
          setOpen={(open) => setOpenAuthenticatorSettings(open)}
        />
      )}
      {openRecoveryCodes && (
        <RecoveryCodes setOpen={(open) => setOpenRecoveryCodes(open)} />
      )}
    </IonList>
  );
}
