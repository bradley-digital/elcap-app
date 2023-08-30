import ProfileItem from "components/ProfileItem/ProfileItem";
import { useState } from "react";
import RecoveryCodes from "../../components/RecoveryCodes/RecoveryCodes";
import AuthenticatorApp from "components/AuthenticatorApp/AuthenticatorApp";

export default function ProfileAccountSecurity() {
  const [openAuthenticatorSettings, setOpenAuthenticatorSettings] =
    useState(false);
  const [openRecoveryCodes, setOpenRecoveryCodes] = useState(false);

  return (
    <>
      <ProfileItem
        label="Authenticator app"
        onClick={() => {
          setOpenAuthenticatorSettings(true);
        }}
      />
      <ProfileItem
        label="Recovery codes"
        onClick={() => {
          setOpenRecoveryCodes(true);
        }}
      />
      {openAuthenticatorSettings && (
        <AuthenticatorApp
          open={openAuthenticatorSettings}
          setOpen={(open) => setOpenAuthenticatorSettings(open)}
        />
      )}
      {openRecoveryCodes && (
        <RecoveryCodes
          open={openRecoveryCodes}
          setOpen={(open) => setOpenRecoveryCodes(open)}
        />
      )}
    </>
  );
}
