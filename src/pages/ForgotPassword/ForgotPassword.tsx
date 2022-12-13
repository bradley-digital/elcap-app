// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import Form from "components/Form/Form";
import FormForgotPassword from "components/Form/FormForgotPassword";

export default function ForgotPassword() {
  return (
    <Form title="Forgot Password">
      <FormForgotPassword />
      <IonText className="Form__accountHelp">
        <Link to="/login" className="Form__accountHelpLink--secondary">
          Back to login
        </Link>
      </IonText>
    </Form>
  );
}
