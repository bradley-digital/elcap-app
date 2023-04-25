// components
import { Link, useParams } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormSetPassword from "components/FormSetPassword/FormSetPassword";
import PasswordRequirements from "components/PasswordRequirements/PasswordRequirements";

export default function SetPassword() {
  const { registerToken } = useParams<{ registerToken: string }>();

  return (
    <AuthPageTemplate title="Complete registration">
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
