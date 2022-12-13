import { Form, Formik } from "formik";
import * as Yup from "yup";

// lib
import {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
} from "lib/formValidation";

// hooks
import useAuth from "hooks/useAuth";

// components
import SubmitButton from "components/SubmitButton/SubmitButton";
import FormInput from "components/Form/FormInput";

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
      onSubmit={async (values, actions) => {
        actions.resetForm();
        await register(values);
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
