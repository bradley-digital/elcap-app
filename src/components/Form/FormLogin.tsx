import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// hooks
import useAuth from "hooks/useAuth";

// components
import { IonButton } from "@ionic/react";
import { FormInput } from "components/Form/FormInput";

// helpers
import { emailValidation, passwordValidation } from "helpers/formValidation";

// styles
import "components/Form/Form.scss";

export default function FormLogin() {
  const { error, login } = useAuth();
  const [, setErrorMessage] = useState<ReactNode>(null);

  useEffect(() => {
    error && setErrorMessage(<p>Login failed; Invalid user ID or password.</p>);
  }, [error]);

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
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="Form__inputGroup">
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
            />
          </div>
          <IonButton type="submit">Login</IonButton>
        </form>
      )}
    </Formik>
  );
}
