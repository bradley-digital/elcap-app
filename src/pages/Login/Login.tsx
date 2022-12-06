import Form from "components/Form/Form";
import FormLogin from "components/Form/FormLogin";

export default function Login() {
  return (
    <Form
      title="Login"
      subtitle="Hi there! Welcome to El Capitan."
      form={<FormLogin />}
      isSocialLoginShown={true}
      accountHelpLeftText="Forgot password?"
      accountHelpLeftLink="/forgot-password"
      accountHelpRightText="Create account"
      accountHelpRightLink="/register"
    />
  );
}
