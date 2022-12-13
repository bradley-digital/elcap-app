// components
import { Link } from "react-router-dom";
import { IonText } from "@ionic/react";
import Form from "components/Form/Form";
import FormRegister from "components/Form/FormRegister";

export default function Register() {
  return (
    <Form title="Sign Up">
      <FormRegister />
      <IonText className="Form__accountHelp--center">
        <span>
          Already have an account? {" "}
          <Link to="/login" className="Form__accountHelpLink">
            Sign in
          </Link>
        </span>
      </IonText>
    </Form>
  );
}
