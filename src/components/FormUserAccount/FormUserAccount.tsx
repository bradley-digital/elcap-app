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
import { IonList, IonListHeader } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUserManagement from "hooks/useUserManagement";

const roleOptions = [
  {
    value: "ADMIN",
    label: "ADMIN",
  },
  {
    value: "PAYMENTS",
    label: "PAYMENTS",
  },
  {
    value: "PORTAL",
    label: "PORTAL",
  },
];

type Props = {
  profile: Profile;
};

export default function FormUserAccount({ profile }: Props) {
  const { update } = useUserManagement();

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
    role: origRole,
  } = profile;

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
        role: origRole,
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
        update({ id, ...values });
      }}
    >
      <Form>
        <IonList>
          <IonListHeader>Account Details</IonListHeader>

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
            icon={lockClosed}
            readonly={true}
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

          <FormSelect label="Role" name="role" options={roleOptions} />

          <SubmitButton>Submit</SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
