import { useState } from "react";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
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

export default function FormResetPassword() {
  const { resetPassword } = useAuth();
  const { resetToken } = useParams<{ resetToken: string }>();
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
        await resetPassword({
          resetToken,
          password,
          otp,
        });
        setIsSubmitting(false);
      }}
    >
      <Form>
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
        <FormInput
          label="Authentication/Recovery code"
          name="otp"
          type="text"
          placeholder="XXXXXX OR XXXXX-XXXXX"
        />
        <SubmitButton isSubmitting={isSubmitting}>Reset Password</SubmitButton>
      </Form>
    </Formik>
  );
}
