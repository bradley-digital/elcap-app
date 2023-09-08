import { useState } from "react";
import * as Yup from "yup";

// lib
import { currency } from "lib/formats";
import {
  transferFromAccountValidation,
  transferToAccountValidation,
  transferMemoValidation,
  transferDateValidation,
} from "lib/formValidation";

// components
import { IonList } from "@ionic/react";
import { Form, Formik } from "formik";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";
import FormDatePicker from "components/FormDatePicker/FormDatePicker";

export default function FormTransferAccount() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accounts, createTransfer } = useUserWesternAllianceAccount();

  const transferAmountValidation = Yup.number()
    .nullable()
    .test(
      "max",
      "Amount must be less than the account balance",
      (value, context) => {
        const account = accounts?.find(
          ({ accountNumber }) => accountNumber === context.parent.fromAccount
        );
        if (account) {
          return Number(value) <= parseFloat(account.accountBalance);
        }
        return true;
      }
    )
    .required("Amount required");

  const accountOptions =
    accounts
      ?.map(({ accountBalance, accountNumber, accountName }) => {
        const truncatedAccountNumber = accountNumber.slice(-4);
        const label = `${accountName} (...${truncatedAccountNumber}): ${currency(
          Number(accountBalance)
        )}`;
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
        transferDate: new Date().toISOString(),
      }}
      validationSchema={Yup.object({
        amount: transferAmountValidation,
        fromAccount: transferFromAccountValidation,
        memo: transferMemoValidation,
        toAccount: transferToAccountValidation,
        transferDate: transferDateValidation,
      })}
      onSubmit={(values) => {
        async function submit() {
          setIsSubmitting(true);
          await createTransfer({
            ...values,
            amount: values.amount || 0,
            type: "ACCOUNT",
            transferDate: new Date(values.transferDate),
          });
          setIsSubmitting(false);
        }
        submit();
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
              options={accountOptions?.filter(
                ({ value }) => value !== values.fromAccount
              )}
              disabled={values.fromAccount === ""}
            />
            <FormInput label="Amount" name="amount" type="text" />
            <FormDatePicker
              label="Transfer date"
              name="transferDate"
              type="date"
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
