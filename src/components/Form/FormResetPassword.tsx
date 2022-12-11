import { useState } from "react";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

// components
import { useIonToast } from "@ionic/react";
import SubmitButton from "components/Form/SubmitButton";
import FormInput from "components/Form/FormInput";

// lib
import {
  passwordValidation,
  confirmPasswordValidation,
} from "lib/formValidation";
import getErrorMessage from "lib/error";

// hooks
import useAuth from "hooks/useAuth";

export default function FormResetPassword() {
  const { authApi } = useAuth();
  const [didSubmit, setDidSubmit] = useState(false);
  const [showToast] = useIonToast();
  const { resetToken } = useParams<{ resetToken: string }>();

  return (
    <Formik
      initialValues={{
        resetToken: resetToken,
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation,
      })}
      onSubmit={async ({ resetToken, password }) => {
        setDidSubmit(true);
        try {
          const res = await authApi.patch("/users/reset-password", {
            resetToken,
            password,
          });
          showToast({
            message: res.data.message,
            duration: 4000,
            keyboardClose: true,
            position: "bottom",
            color: "success",
          });
        } catch (error) {
          setDidSubmit(false);
          showToast({
            message: getErrorMessage(error),
            duration: 4000,
            position: "bottom",
            color: "danger",
          });
        }
      }}
    >
      <Form>
        <p>Your new password must:</p>
        <ul>
          <li>Contain 8-36 characters.</li>
        </ul>
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
        <SubmitButton disabled={didSubmit}>
          Go
        </SubmitButton>
      </Form>
    </Formik>
  );
}
