import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// lib
import {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  phoneValidation,
  addressLine1Validation,
  addressLine2Validation,
  countryValidation,
  stateValidation,
} from "lib/formValidation";

// hooks
import useAuth from "hooks/useAuth";

// components
import FormInput from "components/AuthFormInput/AuthFormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

export default function FormRegister() {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
      }}
      validationSchema={Yup.object({
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        email: emailValidation,
        phone: phoneValidation,
        addressLine1: addressLine1Validation,
        addressLine2: addressLine2Validation,
        country: countryValidation,
        state: stateValidation,
      })}
      onSubmit={async (values, actions) => {
        setIsSubmitting(true);
        actions.resetForm();
        await register(values);
        setIsSubmitting(false);
      }}
    >
      <Form>
        <FormInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="First Name"
        />

        <FormInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Last Name"
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
        />

        <FormInput label="Phone" name="phone" type="text" placeholder="Phone" />

        <FormInput
          label="Address line 1"
          name="addressLine1"
          type="text"
          placeholder="Address line 1"
        />

        <FormInput
          label="Address line 2"
          name="addressLine2"
          type="text"
          placeholder="Address line 2"
        />

        <FormInput
          label="Country"
          name="country"
          type="text"
          placeholder="Country"
        />

        <FormInput label="State" name="state" type="text" placeholder="State" />

        <SubmitButton isSubmitting={isSubmitting}>
          Register
        </SubmitButton>
      </Form>
    </Formik>
  );
}
