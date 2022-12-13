// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import Form from "components/AuthForm/AuthForm";
import FormResetPassword from "components/AuthForm/FormResetPassword";

export default function ResetPassword() {
  return (
    <Form title="Reset Password">
      <IonText>
        <p>Your new password must:</p>
        <ul>
          <li>Contain 8-36 characters.</li>
        </ul>
      </IonText>
      <FormResetPassword />
      <IonText className="Form__accountHelp">
        <Link to="/login" className="Form__accountHelpLink--secondary">
          Back to login
        </Link>
      </IonText>
    </Form>
  );
}
