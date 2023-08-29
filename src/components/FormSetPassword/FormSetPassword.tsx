import { useState } from "react";
import { Form, Formik } from "formik";
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
import { IonText } from "@ionic/react";
import FormInput from "components/AuthFormInput/AuthFormInput";
import PasswordRequirements from "components/PasswordRequirements/PasswordRequirements";
import QRCode from "components/QRCode/QRCode";
import SubmitButton from "components/SubmitButton/SubmitButton";

type Props = {
  otpAuthUrl: string;
  registerToken: string;
};

export default function FormSetPassword({ otpAuthUrl, registerToken }: Props) {
  const { setPassword } = useAuth();
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
        await setPassword({
          registerToken,
          password,
          otp,
        });
        setIsSubmitting(false);
      }}
    >
      <Form>
        <IonText>
          <PasswordRequirements />
        </IonText>
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Password"
        />
        <IonText>
          <br />
          <br />
          <h3>Authenticator App</h3>
          <p>
            Scan the QR code with your authenticator application and enter the
            code you recieve.
          </p>
          <p>Common authenticator apps you can use:</p>
          <ul>
            <li>Google Authenticator</li>
            <li>Microsoft Authenticator</li>
          </ul>
        </IonText>
        <QRCode link={otpAuthUrl} />
        <FormInput
          label="Authentication code"
          name="otp"
          type="text"
          placeholder="Authentication code"
        />
        <SubmitButton isSubmitting={isSubmitting}>Register</SubmitButton>
      </Form>
    </Formik>
  );
}
