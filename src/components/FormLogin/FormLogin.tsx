import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// lib
import { emailValidation, passwordValidation } from "lib/formValidation";

// hooks
import useAuth from "hooks/useAuth";

// components
import FormInput from "components/AuthFormInput/AuthFormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

export default function FormLogin() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
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
        setIsSubmitting(true);
        actions.resetForm();
        await login(values);
        setIsSubmitting(false);
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
        <SubmitButton isSubmitting={isSubmitting}>
          Login
        </SubmitButton>
      </Form>
    </Formik>
  );
}
