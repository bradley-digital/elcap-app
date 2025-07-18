import { useState } from "react";
import * as Yup from "yup";

// lib
import {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  phoneValidation,
  companyNameValidation,
  addressLine1Validation,
  addressLine2Validation,
  countryValidation,
  stateValidation,
  roleValidation,
  isCannabisValidation,
} from "lib/formValidation";
import { countries } from "lib/countries";

// icons
import { pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

//atoms
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/userListModal";

// hooks
import useUserManagement from "hooks/useUserManagement";
import FormCheckbox from "components/FormCheckbox/FormCheckbox";

const roleOptions = [
  {
    value: "ADMIN",
    label: "ADMIN",
  },
  {
    value: "PORTAL",
    label: "PORTAL",
  },
];

export default function FormCreateUser() {
  const { create } = useUserManagement();
  const [, setIsOpen] = useAtom(isOpenAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        role: "",
        isCannabis: false,
      }}
      validationSchema={Yup.object({
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        email: emailValidation,
        phone: phoneValidation,
        companyName: companyNameValidation,
        addressLine1: addressLine1Validation,
        addressLine2: addressLine2Validation,
        country: countryValidation,
        state: stateValidation,
        role: roleValidation,
        isCannabis: isCannabisValidation,
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        create(values);
        setIsOpen(false);
        setIsSubmitting(false);
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
          <FormInput label="Email" name="email" type="email" icon={pencil} />
          <FormInput label="Phone" name="phone" type="text" icon={pencil} />
          <FormInput
            label="Company Name"
            name="companyName"
            type="text"
            icon={pencil}
          />
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
          <FormSelect label="Country" name="country" options={countries} />
          <FormInput label="State" name="state" type="text" icon={pencil} />
          <FormSelect label="Role" name="role" options={roleOptions} />
          <FormCheckbox
            label="Is cannabis client?"
            name="isCannabis"
            type="checkbox"
          />
          <SubmitButton isSubmitting={isSubmitting}>
            Create New User
          </SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
