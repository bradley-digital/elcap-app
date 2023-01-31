// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormRegister from "components/FormRegister/FormRegister";

export default function Register() {
  return (
    <AuthPageTemplate title="Create account">
      <IonText>
        <p>
          Enter your information below and you&apos;ll recieve an email to
          complete registration.
        </p>
      </IonText>
      <FormRegister />
      <IonText className="AuthPageTemplate__linkRow--center">
        <span>
          Already have an account? <Link to="/login">Sign in</Link>
        </span>
      </IonText>
    </AuthPageTemplate>
  );
}
