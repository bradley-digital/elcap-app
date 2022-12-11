import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// hooks
import useAuth from "hooks/useAuth";

// components
import SubmitButton from "components/Form/SubmitButton";
import FormInput from "components/Form/FormInput";

// lib
import { emailValidation, passwordValidation } from "lib/formValidation";

// styles
import "components/Form/Form.scss";

export default function FormLogin() {
  const { login } = useAuth();

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
      onSubmit={(values, actions) => {
        const loginValues = { ...values };
        actions.resetForm();
        login(loginValues);
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
  );
}
