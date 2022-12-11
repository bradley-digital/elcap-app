import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

// lib
import {
  passwordValidation,
  confirmPasswordValidation,
} from "lib/formValidation";

// hooks
import useAuth from "hooks/useAuth";

// components
import SubmitButton from "components/Form/SubmitButton";
import FormInput from "components/Form/FormInput";

export default function FormResetPassword() {
  const { resetPassword } = useAuth();
  const { resetToken } = useParams<{ resetToken: string }>();

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation,
      })}
      onSubmit={async ({ password }) => {
        await resetPassword({
          resetToken,
          password,
        });
      }}
    >
      <Form>
        <p>Your new password must:</p>
        <ul>
          <li>Contain 8-36 characters.</li>
        </ul>
        <FormInput
          label="New Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <FormInput
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Password"
        />
        <SubmitButton>Reset Password</SubmitButton>
      </Form>
    </Formik>
  );
}
