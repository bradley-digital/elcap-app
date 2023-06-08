import { useState } from "react";
import * as Yup from "yup";

// lib
import {
  accountNumberValidation,
  accountTitleValidation,
  clientValidation,
} from "lib/formValidation";

// icons
import { pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

//atoms
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/westernAllianceModal";

// hooks
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

export default function FormCreateWesternAlliance() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsOpen] = useAtom(isOpenAtom);
  const { createAccount } = useWesternAllianceAccount();

  return (
    <Formik
      initialValues={{
        accountNumber: "",
        accountTitle: "",
        client: "",
      }}
      validationSchema={Yup.object({
        accountNumber: accountNumberValidation,
        accountTitle: accountTitleValidation,
        client: clientValidation,
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        createAccount(values);
        setIsOpen(false);
        setIsSubmitting(false);
      }}
    >
      <Form>
        <IonList>
          <FormInput label="Client" name="client" type="text" icon={pencil} />
          <FormInput
            label="Account Title"
            name="accountTitle"
            type="text"
            icon={pencil}
          />
          <FormInput
            label="Account Number"
            name="accountNumber"
            type="text"
            icon={pencil}
          />
          <SubmitButton isSubmitting={isSubmitting}>
            Create New Account
          </SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
