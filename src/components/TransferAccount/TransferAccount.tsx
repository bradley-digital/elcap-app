import { useState } from "react";
import * as Yup from "yup";

// lib
import { currency } from "lib/formats";
import {
  transferFromAccountValidation,
  transferToAccountValidation,
  transferAmountValidation,
  transferMemoValidation,
} from "lib/formValidation";

// components
import { IonList } from "@ionic/react";
import { Form, Formik } from "formik";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

export default function TransferAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accounts } = useUserWesternAllianceAccount();

  const accountOptions =
    accounts
      ?.map(({ accountBalance, accountNumber, accountTitle }) => {
        const truncatedAccountNumber = accountNumber.slice(-4);
        const label = `${accountTitle} (...${truncatedAccountNumber}): ${currency.format(accountBalance)}`;
        return {
          value: accountNumber,
          label,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  return (
    <Formik
      initialValues={{
        amount: null,
        fromAccount: "",
        memo: "",
        toAccount: "",
      }}
      validationSchema={Yup.object({
        amount: transferAmountValidation,
        fromAccount: transferFromAccountValidation,
        memo: transferMemoValidation,
        toAccount: transferToAccountValidation,
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        console.log(values);
        setIsSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <IonList>
            <FormSelect
              label="Transfer from"
              placeholder="Choose an account"
              name="fromAccount"
              type="text"
              className="FormAccountSelect"
              options={accountOptions}
            />
            <FormSelect
              label="Transfer to"
              placeholder="Choose an account"
              name="toAccount"
              type="text"
              className="FormAccountSelect"
              options={accountOptions?.filter(({ value }) => value !== values.fromAccount)}
              disabled={values.fromAccount === ""}
            />
            <FormInput
              label="Amount"
              name="amount"
              type="text"
            />
            <FormInput
              label="Memo (optional)"
              name="memo"
              type="text"
              note="Use letters and numbers only (up to 32 characters)"
            />
            <SubmitButton isSubmitting={isSubmitting}>
              Transfer money
            </SubmitButton>
          </IonList>
        </Form>
      )}
    </Formik>
  );
}
