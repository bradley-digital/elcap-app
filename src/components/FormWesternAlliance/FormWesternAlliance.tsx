import type { Account } from "hooks/useWesternAllianceAccount";
import { useState } from "react";
import * as Yup from "yup";

// lib
import {
  accountBalanceValidation,
  accountNumberValidation,
  accountNameValidation,
  clientValidation,
  routingNumberValidation,
} from "lib/formValidation";

// icons
import { lockClosed, pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList, IonListHeader } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

type Props = {
  account: Account;
};

export default function FormWesternAlliance({ account }: Props) {
  const { updateAccount } = useWesternAllianceAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, accountBalance, accountNumber, accountName, client, routingNumber } = account;

  return (
    <Formik
      initialValues={{
        accountBalance,
        accountNumber,
        accountName,
        client,
        routingNumber,
      }}
      validationSchema={Yup.object({
        accountBalance: accountBalanceValidation,
        accountNumber: accountNumberValidation,
        accountName: accountNameValidation,
        client: clientValidation,
        routingNumber: routingNumberValidation,
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        updateAccount({ id, ...values });
        setIsSubmitting(false);
      }}
    >
      <Form>
        <IonList>
          <IonListHeader>Account information</IonListHeader>
          <FormInput label="Client" name="client" type="text" icon={pencil} />
          <FormInput
            label="Account Name"
            name="accountName"
            type="text"
            icon={lockClosed}
            readonly={true}
          />
          <FormInput
            label="Account Number"
            name="accountNumber"
            type="text"
            icon={lockClosed}
            readonly={true}
          />
          <FormInput label="Routing number" name="routingNumber" type="text" />
          <FormInput
            label="Account Balance"
            name="accountBalance"
            type="text"
            icon={lockClosed}
            readonly={true}
          />
          <SubmitButton isSubmitting={isSubmitting}>
            Update Account
          </SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
