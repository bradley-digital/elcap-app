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
import FormObserver from "components/FormObserver/FormObserver";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";
import FormSelect from "components/FormSelect/FormSelect";

// hooks
import useUser from "hooks/useUser";

// data
import { states } from "lib/states";

type Props = {
  profile: Profile;
};

export default function FormAccount({ profile }: Props) {
  const { updateUser } = useUser();
  const [edited, setEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        updateUser(values);
        setEdited(false);
        setIsSubmitting(false);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FormObserver onChange={handleChange} />
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
            <FormSelect
              label="Country"
              name="country"
              options={countries}
              onChange={(value: any) => {
                setFieldValue("country", value);
                setFieldValue("state", "");
              }}
            />
            {values.country === "United States" && (
              <FormSelect
                label="State"
                name="state"
                options={states}
                onChange={(value: any) => {
                  setFieldValue("state", value);
                }}
              />
            )}
            {edited && (
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
