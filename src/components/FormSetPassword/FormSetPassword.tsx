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
import FormInput from "components/AuthFormInput/AuthFormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

export default function FormSetPassword() {
  const { setPassword } = useAuth();
  const { registerToken } = useParams<{ registerToken: string }>();

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
        await setPassword({
          registerToken,
          password,
        });
      }}
    >
      <Form>
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Password"
        />
        <SubmitButton>Set Password</SubmitButton>
      </Form>
    </Formik>
  );
}
