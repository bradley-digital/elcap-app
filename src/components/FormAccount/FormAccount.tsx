import type { Profile } from "hooks/useApi";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";

// lib
import {
  firstNameValidation,
  lastNameValidation,
  userNameValidation,
  emailValidation,
  phoneValidation,
} from "lib/formValidation";

// components
import {
  IonList,
  IonListHeader,
} from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useApi from "hooks/useApi";

type Props = {
  profile: Profile;
};

function FormObserver() {
  const { values } = useFormikContext();

  useEffect(() => {
    console.log(values)
  }, [values]);

  return null;
}

export default function FormAccount({ profile }: Props) {
  const { updateUser } = useApi();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.setQueryData("userAccount", data);
    }
  });

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
      onSubmit={(values) => mutate(values)}
    >
      <Form>
        <IonList>
          <IonListHeader>Account information</IonListHeader>
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
          />
          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
          />
          <FormInput
            label="User Name"
            name="userName"
            type="text"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            readonly
          />
          <FormInput
            label="Phone"
            name="phone"
            type="text"
          />
          <SubmitButton>Update</SubmitButton>
        </IonList>
        <FormObserver />
      </Form>
    </Formik>
  );
}
