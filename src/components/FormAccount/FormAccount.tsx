import type { Profile } from "hooks/useUser";
import { useState } from "react";
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
  companyNameValidation,
} from "lib/formValidation";
import { countries } from "lib/countries";

// icons
import { lockClosed, pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";
import FormSelect from "components/FormSelect/FormSelect";

// hooks
import useUser from "hooks/useUser";

type Props = {
  profile: Profile;
};

export default function FormAccount({ profile }: Props) {
  const { updateUser } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    firstName,
    lastName,
    email,
    phone,
    companyName,
    addressLine1,
    addressLine2,
    country,
    state,
  } = profile;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName,
        lastName,
        email,
        phone,
        companyName,
        addressLine1,
        addressLine2,
        country,
        state,
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
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        updateUser(values);
        setIsSubmitting(false);
      }}
    >
      {({ dirty }) => (
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
              icon={lockClosed}
              readonly
            />
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
            {dirty && (
              <SubmitButton className="w-100" isSubmitting={isSubmitting}>
                Update
              </SubmitButton>
            )}
          </IonList>
        </Form>
      )}
    </Formik>
  );
}
