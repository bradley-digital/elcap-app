import { Form, Formik } from "formik";
import * as Yup from "yup";

// lib
import { emailValidation } from "lib/formValidation";

// hooks
import useAuth from "hooks/useAuth";

// components
import FormInput from "components/AuthFormInput/AuthFormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: emailValidation,
      })}
      onSubmit={async (values) => {
        await forgotPassword(values);
      }}
    >
      <Form>
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
        />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Formik>
  );
}
