// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import AuthPageTemplate from "components/AuthPageTemplate/AuthPageTemplate";
import FormForgotPassword from "components/FormForgotPassword/FormForgotPassword";

export default function ForgotPassword() {
  return (
    <AuthPageTemplate title="Forgot Password">
      <FormForgotPassword />
      <IonText className="d-flex ion-justify-content-between ion-padding-top">
        <Link to="/login" className="secondary">
          Back to login
        </Link>
      </IonText>
    </AuthPageTemplate>
  );
}
