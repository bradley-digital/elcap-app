import Form from "components/Form/Form";
import FormLogin from "components/Form/FormLogin";

export default function Login() {
  const accountHelpLeft = {
    text: "Forgot password?",
    link: "/forgot-password",
  };

  const accountHelpRight = {
    text: "Create account",
    link: "/register",
  };
  return (
    <Form
      title="Login"
      subtitle="Hi there! Welcome to El Capitan."
      form={<FormLogin />}
      isSocialLoginShown={true}
      accountHelpLeft={accountHelpLeft}
      accountHelpRight={accountHelpRight}
    />
  );
}
