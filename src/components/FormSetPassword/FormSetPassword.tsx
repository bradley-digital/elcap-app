import { Form, Formik } from "formik";
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

type Props = {
  registerToken: string;
};

export default function FormSetPassword({ registerToken }: Props) {
  const { setPassword } = useAuth();

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
