import Form from "components/Form/Form";
import FormResetPassword from "components/Form/FormResetPassword";
import "components/Form/Form.scss";

export default function ResetPassword() {
  const accountHelpLeft = {
    text: "Back to login",
    link: "/",
  };

  return (
    <Form
      title="Reset Password"
      form={<FormResetPassword />}
      accountHelpLeft={accountHelpLeft}
    />
  );
}
