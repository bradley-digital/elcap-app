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
  addressValidation,
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
import FormSelect from "components/FormSelect/FormSelect";

type Props = {
  profile?: Profile;
};

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

export default function FormUserManagement({ profile }: Props) {
  const { mutate, createUser } = useUser();
  const [edited, setEdited] = useState(false);

  function handleChange() {
    if (edited) return;
    setEdited(true);
  }

  const { firstName, lastName, userName, email, phone, role, address } =
    profile || {};

  const isNewUser = email === "";
  // console.log(isNewUser);

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
        // setEdited(false);
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
          {/* {edited && (
            <> */}
          {isNewUser ? (
            <SubmitButton>Create New User</SubmitButton>
          ) : (
            <SubmitButton>Update</SubmitButton>
          )}
          {/* </>
          )} */}
        </IonList>
      </Form>
    </Formik>
  );
}
