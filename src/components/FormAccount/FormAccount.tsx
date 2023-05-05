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

// icons
import { lockClosed, pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList, IonListHeader, IonSpinner } from "@ionic/react";
import FormObserver from "components/FormObserver/FormObserver";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUser from "hooks/useUser";

type Props = {
  profile: Profile;
};

export default function FormAccount({ profile }: Props) {
  const { mutate } = useUser();
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange() {
    if (edited) return;
    setEdited(true);
  }

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
        mutate(values);
        setIsSubmitting(false);
        setEdited(false);
      }}
    >
      <Form>
        <FormObserver onChange={handleChange} />
        <IonList>
          <IonListHeader>Profile information</IonListHeader>

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

          <FormInput label="Country" name="country" type="text" icon={pencil} />

          <FormInput label="State" name="state" type="text" icon={pencil} />

          {edited && (
            <SubmitButton className="w-100">
              {isSubmitting ? <IonSpinner name="crescent" /> : "Update"}
            </SubmitButton>
          )}
        </IonList>
      </Form>
    </Formik>
  );
}
