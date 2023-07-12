import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// lib
import {
  passwordValidation,
  confirmPasswordValidation,
  otpValidation,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
        otp: "",
      }}
      validationSchema={Yup.object({
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation,
        otp: otpValidation,
      })}
      onSubmit={async ({ password, otp }) => {
        setIsSubmitting(true);
        await setPassword({
          registerToken,
          password,
          otp,
        });
        setIsSubmitting(false);
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
        <FormInput label="OTP" name="otp" type="number" placeholder="OTP" />
        <SubmitButton isSubmitting={isSubmitting}>Set Password</SubmitButton>
      </Form>
    </Formik>
  );
}
