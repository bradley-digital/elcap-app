import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// lib
import { emailValidation } from "lib/formValidation";

// hooks
import useAuth from "hooks/useAuth";

// components
import FormInput from "components/AuthFormInput/AuthFormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";
import { IonSpinner } from "@ionic/react";

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: emailValidation,
      })}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        await forgotPassword(values);
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
        <SubmitButton>
          {isSubmitting ? <IonSpinner name="crescent" /> : "Submit"}
        </SubmitButton>
      </Form>
    </Formik>
  );
}
