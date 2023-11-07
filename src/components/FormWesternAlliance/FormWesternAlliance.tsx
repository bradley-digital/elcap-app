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
  userIdValidation,
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
import FormSelect from "components/FormSelect/FormSelect";
import useUserManagement from "hooks/useUserManagement";

type Props = {
  account: Account;
};

export default function FormWesternAlliance({ account }: Props) {
  const { updateAccount } = useWesternAllianceAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    id,
    accountBalance,
    accountNumber,
    accountName,
    client,
    routingNumber,
    userId,
    user,
  } = account;

  const { data } = useUserManagement();
  const users: { value: string; label: string }[] = [];
  data?.forEach((user) => {
    user.role !== "ADMIN" &&
      users.push({
        value: user.id,
        label: user.companyName || `${user.firstName} ${user.lastName}`,
      });
  });

  return (
    <Formik
      initialValues={{
        accountBalance,
        accountNumber,
        accountName,
        userId: userId || "",
        routingNumber,
      }}
      validationSchema={Yup.object({
        accountBalance: accountBalanceValidation,
        accountNumber: accountNumberValidation,
        accountName: accountNameValidation,
        userId: userIdValidation,
        routingNumber: routingNumberValidation,
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        updateAccount({ id, ...values });
        setIsSubmitting(false);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <IonList>
            <IonListHeader>Account information</IonListHeader>
            <FormSelect
              label="Client"
              name="userId"
              options={users || []}
              onChange={(value: any) => {
                setFieldValue("userId", value);
              }}
            />
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
            <FormInput
              label="Routing number"
              name="routingNumber"
              type="text"
            />
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
      )}
    </Formik>
  );
}
