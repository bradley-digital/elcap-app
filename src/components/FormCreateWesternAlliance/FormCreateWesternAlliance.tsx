import * as Yup from "yup";

// lib
import {
  accountNumberValidation,
  accountBalanceValidation,
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
  const { createAccount } = useWesternAllianceAccount();
  const [, setIsOpen] = useAtom(isOpenAtom);

  return (
    <Formik
      initialValues={{
        accountNumber: "",
        accountBalance: 0,
        accountTitle: "",
        client: "",
      }}
      validationSchema={Yup.object({
        accountNumber: accountNumberValidation,
        accountBalance: accountBalanceValidation,
        accountTitle: accountTitleValidation,
        client: clientValidation,
      })}
      onSubmit={(values) => {
        createAccount(values);
        setIsOpen(false);
      }}
    >
      <Form>
        <IonList>
          <FormInput label="Account Number" name="accountNumber" type="text" icon={pencil} />
          <FormInput label="Account Balance" name="accountBalance" type="number" icon={pencil} />
          <FormInput label="Account Title" name="accountTitle" type="text" icon={pencil} />
          <FormInput label="Client" name="client" type="text" icon={pencil} />
          <SubmitButton>Create New Account</SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
