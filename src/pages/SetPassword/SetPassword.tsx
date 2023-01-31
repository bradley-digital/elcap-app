// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormSetPassword from "components/FormSetPassword/FormSetPassword";

export default function SetPassword() {
  return (
    <AuthPageTemplate title="Complete registration">
      <IonText>
        <p>Create your password to complete registration.</p>
        <p>Your password must:</p>
        <ul>
          <li>Contain 8-36 characters.</li>
        </ul>
      </IonText>
      <FormSetPassword />
      <IonText className="AuthPageTemplate__linkRow">
        <Link to="/login" className="secondary">
          Back to login
        </Link>
      </IonText>
    </AuthPageTemplate>
  );
}
