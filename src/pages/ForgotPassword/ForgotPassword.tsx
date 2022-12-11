import Form from "components/Form/Form";
import FormForgotPassword from "components/Form/FormForgotPassword";
import "components/Form/Form.scss";

export default function ForgotPassword() {
  const accountHelpLeft = {
    text: "Back to login",
    link: "/",
  };

  return (
    <Form
      title="Forgot Password"
      form={<FormForgotPassword />}
      accountHelpLeft={accountHelpLeft}
    />
  );
}
