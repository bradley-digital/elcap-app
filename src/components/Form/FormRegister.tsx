import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton } from "@ionic/react";
import { FormInput } from "components/Form/FormInput";

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
  const { error, register } = useAuth();
  const [, setErrorMessage] = useState<ReactNode>(null);

  // Not correct
  // Will improve after Jairo's update is merged
  useEffect(() => {
    error &&
      setErrorMessage(
        <p>
          A link to activate your account has been emailed to the address
          provided.
        </p>
      );
  }, [error]);

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
        const vals = { ...values };
        actions.resetForm();
        register(vals);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
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
          <div className="Form__inputGroup">
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
          </div>

          <IonButton type="submit">Register</IonButton>
        </form>
      )}
    </Formik>
  );
}
