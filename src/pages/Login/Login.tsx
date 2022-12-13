// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import Form from "components/Form/Form";
import FormLogin from "components/Form/FormLogin";

export default function Login() {
  return (
    <Form title="Login">
      <IonText>
        <p>Hi there! Welcome to El Capitan.</p>
      </IonText>
      <FormLogin />
      <IonText className="Form__accountHelp">
        <Link
          to="/forgot-password"
          className="Form__accountHelpLink--secondary"
        >
          Forgot password?
        </Link>
        <Link to="/register" className="Form__accountHelpLink">
          Create account
        </Link>
      </IonText>
    </Form>
  );
}
