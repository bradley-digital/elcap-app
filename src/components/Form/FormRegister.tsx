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
import {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
} from "lib/formValidation";

// styles
import "components/Form/Form.scss";

export default function FormRegister() {
  const { register } = useAuth();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      }}
      validationSchema={Yup.object({
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        email: emailValidation,
        phone: phoneValidation,
        password: passwordValidation,
      })}
      onSubmit={(values, actions) => {
        const registerValues = { ...values };
        actions.resetForm();
        register(registerValues);
      }}
    >
      <Form>
        <FormInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
        />
        <FormInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="First Name"
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
        />
        <FormInput
          label="Phone"
          name="phone"
          type="text"
          placeholder="Phone"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <SubmitButton>Register</SubmitButton>
      </Form>
    </Formik>
  );
}
