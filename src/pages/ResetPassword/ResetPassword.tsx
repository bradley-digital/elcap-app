import Form from "components/Form/Form";
import FormResetPassword from "components/Form/FormResetPassword";
import "components/Form/Form.scss";

export default function ResetPassword() {
  return (
    <Form
      title="Reset Password"
      form={<FormResetPassword />}
      accountHelpLeftText="Back to login"
      accountHelpLeftLink="/"
    />
  );
}
