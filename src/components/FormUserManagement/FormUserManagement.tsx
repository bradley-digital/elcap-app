import type { Profile } from "hooks/useUser";
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
  roleValidation,
} from "lib/formValidation";

// icons
import { lockClosed, pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

//atoms
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/userListModal";

// hooks
import useUserManagement from "hooks/useUserManagement";
import FormSelect from "components/FormSelect/FormSelect";

const roleOptions = [
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
  profile: Profile;
};

export default function FormUserManagement({ profile }: Props) {
  const { create, update } = useUserManagement();
  const [, setIsOpen] = useAtom(isOpenAtom);

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    addressLine2,
    country,
    state,
    role,
  } = profile;

  // This is brittle, what's a better way?
  const isNewUser = email === "";

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        email,
        phone,
        addressLine1,
        addressLine2,
        country,
        state,
        role,
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
        role: roleValidation,
      })}
      onSubmit={(values) => {
        if (isNewUser) {
          create(values);
        } else {
          update({ id, ...values });
        }
        setIsOpen(false);
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
            label="Email"
            name="email"
            type="email"
            icon={isNewUser ? pencil : lockClosed}
            readonly={isNewUser ? false : true}
          />

          <FormInput label="Phone" name="phone" type="text" icon={pencil} />

          <FormInput
            label="Address line 1"
            name="addressLine1"
            type="text"
            icon={pencil}
          />

          <FormInput
            label="Address line 2"
            name="addressLine2"
            type="text"
            icon={pencil}
          />

          <FormInput label="Country" name="country" type="text" icon={pencil} />

          <FormInput label="State" name="state" type="text" icon={pencil} />

          <FormSelect
            label="Role"
            name="role"
            icon={pencil}
            options={roleOptions}
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
