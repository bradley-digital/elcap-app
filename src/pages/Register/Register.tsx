import Form from "components/Form/Form";
import FormRegister from "components/Form/FormRegister";

export default function Register() {
  const accountHelpCenter = {
    text: "Already have an account?",
    link: "/login",
    linkText: "Sign In",
  };

  return (
    <Form
      title="Sign Up"
      form={<FormRegister />}
      accountHelpCenter={accountHelpCenter}
    />
  );
}
