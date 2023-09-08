import { useState } from "react";
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

export default function FormResetPassword() {
  const { resetPassword } = useAuth();
  const { resetToken } = useParams<{ resetToken: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);
        await resetPassword({
          resetToken,
          password,
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
        <SubmitButton isSubmitting={isSubmitting}>Reset Password</SubmitButton>
      </Form>
    </Formik>
  );
}
