import Form from "components/Form/Form";
import FormRegister from "components/Form/FormRegister";

export default function Register() {
  return (
    <Form
      title="Sign Up"
      form={<FormRegister />}
      accountHelpLeftText="Already have an account?"
      accountHelpLeftLink="/register"
      accountHelpRightText="Signin"
      accountHelpRightLink="/register"
    />

    // <div className="Form__accountHelp">
    //   <p>
    //     Have an account?{" "}
    //     <Link to="/login" className="Form__accountHelp--right">
    //       Sign In
    //     </Link>
    //   </p>
    // </div>
  );
}
