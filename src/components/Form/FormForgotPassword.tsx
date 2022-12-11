import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// components
import { useIonToast } from "@ionic/react";
import SubmitButton from "components/Form/SubmitButton";
import FormInput from "components/Form/FormInput";

// lib
import { emailValidation } from "lib/formValidation";
import getErrorMessage from "lib/error";

// hooks
import useAuth from "hooks/useAuth";

export default function ForgotPasswordForm() {
  const { authApi } = useAuth();
  const [didSubmit, setDidSubmit] = useState(false);
  const [showToast] = useIonToast();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: emailValidation,
      })}
      onSubmit={async ({ email }) => {
        setDidSubmit(true);
        try {
          const res = await authApi.post("/email/forgot-password", {
            email,
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
        <FormInput
          label="Email"
          name="email"
          type="email"
          disabled={didSubmit}
          placeholder="Email"
        />
        <SubmitButton disabled={didSubmit}>
          Go
        </SubmitButton>
      </Form>
    </Formik>
  );
}
