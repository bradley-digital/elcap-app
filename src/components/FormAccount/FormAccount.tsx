import type { Profile } from "hooks/useUser";
import { useState } from "react";
import * as Yup from "yup";

// lib
import {
  firstNameValidation,
  lastNameValidation,
  userNameValidation,
  emailValidation,
  phoneValidation,
} from "lib/formValidation";

// icons
import { lockClosed, pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList, IonListHeader } from "@ionic/react";
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

  function handleChange() {
    if (edited) return;
    setEdited(true);
  }

  const { firstName, lastName, userName, email, phone } = profile;

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        userName,
        email,
        phone,
      }}
      validationSchema={Yup.object({
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        userName: userNameValidation,
        email: emailValidation,
        phone: phoneValidation,
      })}
      onSubmit={(values) => {
        mutate(values);
        setEdited(false);
      }}
    >
      <Form>
        <FormObserver onChange={handleChange} />
        <IonList>
          <IonListHeader>Account information</IonListHeader>
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
          <FormInput label="Phone" name="phone" type="text" icon={pencil} />
          <FormInput
            label="Email"
            name="email"
            type="email"
            icon={lockClosed}
            readonly
          />
          {edited && (
            <>
              <SubmitButton>Update</SubmitButton>
              <hr />
            </>
          )}
        </IonList>
      </Form>
    </Formik>
  );
}
