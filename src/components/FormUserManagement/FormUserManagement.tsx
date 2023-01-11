import type { Profile } from "hooks/useUser";
import * as Yup from "yup";

// lib
import {
  firstNameValidation,
  lastNameValidation,
  userNameValidation,
  emailValidation,
  phoneValidation,
  addressValidation,
} from "lib/formValidation";

// icons
import { lockClosed, pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUser from "hooks/useUser";
import FormSelect from "components/FormSelect/FormSelect";

const options = [
  {
    value: "PORTAL",
    label: "PORTAL",
  },
  {
    value: "PAYMENTS",
    label: "PAYMENTS",
  },
  {
    value: "ADMIN",
    label: "ADMIN",
  },
];

type Props = {
  profile?: Profile;
};

export default function FormUserManagement({ profile }: Props) {
  const { mutate, createUser } = useUser();

  const { firstName, lastName, userName, email, phone, role, address } =
    profile || {};

  const isNewUser = email === "";

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        userName,
        address,
        email,
        role,
        phone,
      }}
      validationSchema={Yup.object({
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        userName: userNameValidation,
        address: addressValidation,
        email: emailValidation,
        phone: phoneValidation,
      })}
      onSubmit={(values) => {
        if (isNewUser) {
          createUser(values);
        } else {
          mutate(values);
        }
      }}
    >
      <Form>
        <IonList>
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            icon={pencil}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            icon={pencil}
          />

          <FormInput
            label="User Name"
            name="userName"
            type="text"
            icon={pencil}
          />

          <FormInput label="Address" name="address" type="text" icon={pencil} />
          <FormInput label="Phone" name="phone" type="text" icon={pencil} />
          <FormInput
            label="Email"
            name="email"
            type="email"
            icon={isNewUser ? pencil : lockClosed}
            readonly={isNewUser ? false : true}
          />

          <FormSelect
            label="Role"
            name="role"
            icon={pencil}
            options={options}
          />

          {isNewUser ? (
            <SubmitButton>Create New User</SubmitButton>
          ) : (
            <SubmitButton>Update</SubmitButton>
          )}

        </IonList>
      </Form>
    </Formik>
  );
}
