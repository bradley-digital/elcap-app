// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormResetPassword from "components/FormResetPassword/FormResetPassword";
import PasswordRequirements from "components/PasswordRequirements/PasswordRequirements";

export default function ResetPassword() {
  return (
    <AuthPageTemplate title="Reset password">
      <IonText>
        <PasswordRequirements />
      </IonText>
      <FormResetPassword />
      <IonText className="AuthPageTemplate__linkRow">
        <Link to="/login" className="secondary">
          Back to login
        </Link>
      </IonText>
    </AuthPageTemplate>
  );
}
