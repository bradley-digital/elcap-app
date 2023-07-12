// components
import { Link, useParams } from "react-router-dom";
import { IonCol, IonRow, IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormSetPassword from "components/FormSetPassword/FormSetPassword";
import PasswordRequirements from "components/PasswordRequirements/PasswordRequirements";
import { useQueryParams } from "hooks/useQueryParams";
import QRCode from "components/QRCode/QRCode";

export default function SetPassword() {
  const { registerToken } = useParams<{ registerToken: string }>();
  const params = useQueryParams();
  const otpAuthUrl = params.get("otpAuthUrl") || "";

  return (
    <AuthPageTemplate title="Complete registration">
      <IonText>
        <p>Scan with your authenticator application</p>
        <QRCode link={otpAuthUrl} />
      </IonText>
      <IonText>
        <p>Create your password to complete registration.</p>
        <PasswordRequirements />
      </IonText>
      <FormSetPassword registerToken={registerToken} />
      <IonText className="AuthPageTemplate__linkRow">
        <Link to="/login" className="secondary">
          Back to login
        </Link>
      </IonText>
    </AuthPageTemplate>
  );
}
