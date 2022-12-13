import { Form, Formik } from "formik";
import * as Yup from "yup";

// lib
import { emailValidation, passwordValidation } from "lib/formValidation";

// hooks
import useAuth from "hooks/useAuth";

// components
import GoogleLoginButton from "components/AuthForm/GoogleLoginButton";
import SubmitButton from "components/SubmitButton/SubmitButton";
import FormInput from "components/AuthForm/AuthFormInput";

// styles
import "components/AuthForm/AuthForm.scss";

export default function FormLogin() {
  const { login } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: emailValidation,
          password: passwordValidation,
        })}
        onSubmit={async (values, actions) => {
          actions.resetForm();
          await login(values);
        }}
      >
        <Form>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <SubmitButton>Login</SubmitButton>
        </Form>
      </Formik>
      <div className="Form__socialLogin">
        <GoogleLoginButton />
      </div>
    </>
  );
}
