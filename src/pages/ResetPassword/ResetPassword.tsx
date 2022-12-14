// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormResetPassword from "components/FormResetPassword/FormResetPassword";

export default function ResetPassword() {
  return (
    <AuthPageTemplate title="Reset Password">
      <IonText>
        <p>Your new password must:</p>
        <ul>
          <li>Contain 8-36 characters.</li>
        </ul>
      </IonText>
      <FormResetPassword />
      <IonText className="d-flex ion-justify-content-between ion-padding-top">
        <Link to="/login" className="secondary">
          Back to login
        </Link>
      </IonText>
    </AuthPageTemplate>
  );
}
