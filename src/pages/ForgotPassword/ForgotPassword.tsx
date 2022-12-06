import Form from "components/Form/Form";
import FormForgotPassword from "components/Form/FormForgotPassword";
import "components/Form/Form.scss";

export default function ForgotPassword() {
  return (
    <Form
      title="Forgot Password"
      form={<FormForgotPassword />}
      accountHelpLeftText="Back to login"
      accountHelpLeftLink="/"
    />
  );
}
