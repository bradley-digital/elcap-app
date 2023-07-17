import { useEffect, useState } from "react";
import * as Yup from "yup";

// lib
import { currency } from "lib/formats";
import {
  wireExternalAccountNameValidation,
  wireExternalAccountNumberValidation,
  wireExternalFinancialInstitutionValidation,
  wireExternalRoutingNumberValidation,
  wireIntermediaryBankNameValidation,
  wireIntermediaryRoutingNumberValidation,
  wireIntermediaryFurtherCreditToValidation,
  wireMemoValidation,
  wireReceivingAccountValidation,
  wireSendingAccountValidation,
  wireUseIntermediaryAccountValidation,
  wireTypeValidation,
} from "lib/formValidation";

// components
import { IonList, IonListHeader } from "@ionic/react";
import { Form, Formik } from "formik";
import FormCheckbox from "components/FormCheckbox/FormCheckbox";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

// hooks

export default function FormUserTransferExternal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storedReceivingAccount, setStoredReceivingAccount] = useState("");
  const [storedUseIntermediary, setStoredUseIntermediary] = useState(false);
  const { accounts, createExternalAccount, createTransfer, externalAccounts } =
    useWesternAllianceAccount();

  const transferTypeOptions = [
    {
      value: "WIRE",
      label: "Wire",
    },
    {
      value: "ACH",
      label: "ACH",
    },
  ];

  const wireAmountValidation = Yup.number()
    .nullable()
    .test(
      "max",
      "Amount must be less than the account balance",
      (value, context) => {
        const account = accounts?.find(
          ({ accountNumber }) => accountNumber === context.parent.fromAccount,
        );
        if (account) {
          return Number(value) <= parseFloat(account.accountBalance);
        }
        return true;
      },
    )
    .required("Amount required");

  const accountOptions =
    accounts
      ?.map(({ accountBalance, accountNumber, accountTitle }) => {
        const truncatedAccountNumber = accountNumber.slice(-4);
        const label = `${accountTitle} (...${truncatedAccountNumber}): ${currency(
          Number(accountBalance),
        )}`;
        return {
          value: accountNumber,
          label,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  const externalAccountOptions =
    externalAccounts
      ?.map(({ financialInstitution, accountNumber }) => {
        const truncatedAccountNumber = accountNumber.slice(-4);
        const label = `${financialInstitution} (...${truncatedAccountNumber})`;
        return {
          value: accountNumber,
          label,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  externalAccountOptions.push({
    value: "new",
    label: "Add new bank account",
  });

  return (
    <Formik
      initialValues={{
        amount: null,
        externalAccountName: "",
        externalAccountNumber: "",
        externalFinancialInstitution: "",
        externalRoutingNumber: "",
        intermediaryBankName: "",
        intermediaryFurtherCreditTo: "",
        intermediaryRoutingNumber: "",
        memo: "",
        receivingAccount: "",
        sendingAccount: "",
        useIntermediaryAccount: false,
        type: "",
      }}
      validationSchema={Yup.object({
        amount: wireAmountValidation,
        externalAccountName: wireExternalAccountNameValidation,
        externalAccountNumber: wireExternalAccountNumberValidation,
        externalFinancialInstitution:
          wireExternalFinancialInstitutionValidation,
        externalRoutingNumber: wireExternalRoutingNumberValidation,
        intermediaryBankName: wireIntermediaryBankNameValidation,
        intermediaryFurtherCreditTo: wireIntermediaryFurtherCreditToValidation,
        intermediaryRoutingNumber: wireIntermediaryRoutingNumberValidation,
        memo: wireMemoValidation,
        receivingAccount: wireReceivingAccountValidation,
        sendingAccount: wireSendingAccountValidation,
        useIntermediaryAccount: wireUseIntermediaryAccountValidation,
        type: wireTypeValidation,
      })}
      onSubmit={({
        amount,
        externalAccountName,
        externalAccountNumber,
        externalFinancialInstitution,
        externalRoutingNumber,
        intermediaryBankName,
        intermediaryFurtherCreditTo,
        intermediaryRoutingNumber,
        memo,
        receivingAccount,
        sendingAccount,
        useIntermediaryAccount,
        type,
      }) => {
        async function submit() {
          try {
            setIsSubmitting(true);
            if (receivingAccount === "new") {
              await createExternalAccount({
                accountName: externalAccountName,
                accountNumber: externalAccountNumber,
                financialInstitution: externalFinancialInstitution,
                routingNumber: externalRoutingNumber,
                intermediaryBankName,
                intermediaryFurtherCreditTo,
                intermediaryRoutingNumber,
                useIntermediary: useIntermediaryAccount,
              });
            }
            await createTransfer({
              amount: amount || 0,
              externalAccount:
                (receivingAccount !== "new" && receivingAccount) ||
                externalAccountNumber,
              fromAccount: sendingAccount,
              memo,
              type,
            });
          } catch (e) {
            console.error(e);
          } finally {
            setIsSubmitting(false);
          }
        }
        submit();
      }}
    >
      {({ values, setFieldValue }) => {
        useEffect(() => {
          if (values.receivingAccount !== storedReceivingAccount) {
            setStoredReceivingAccount(values.receivingAccount);
            if (values.receivingAccount === "new") {
              setFieldValue("externalAccountName", "", false);
              setFieldValue("externalAccountNumber", "", false);
              setFieldValue("externalFinancialInstitution", "", false);
              setFieldValue("externalRoutingNumber", "", false);
              setFieldValue("intermediaryBankName", "", false);
              setFieldValue("intermediaryRoutingNumber", "", false);
              setFieldValue("intermediaryFurtherCreditTo", "", false);
              setFieldValue("useIntermediaryAccount", false, false);
            } else {
              const externalAccount = externalAccounts?.find(
                ({ accountNumber }) =>
                  accountNumber === values.receivingAccount,
              );
              if (externalAccount) {
                const {
                  accountName,
                  accountNumber,
                  financialInstitution,
                  intermediaryBankName,
                  intermediaryFurtherCreditTo,
                  intermediaryRoutingNumber,
                  routingNumber,
                  useIntermediary,
                } = externalAccount;
                setFieldValue("externalAccountName", accountName || "", false);
                setFieldValue(
                  "externalAccountNumber",
                  accountNumber || "",
                  false,
                );
                setFieldValue(
                  "externalFinancialInstitution",
                  financialInstitution || "",
                  false,
                );
                setFieldValue(
                  "externalRoutingNumber",
                  routingNumber || "",
                  false,
                );
                setFieldValue(
                  "intermediaryBankName",
                  intermediaryBankName || "",
                  false,
                );
                setFieldValue(
                  "intermediaryRoutingNumber",
                  intermediaryRoutingNumber || "",
                  false,
                );
                setFieldValue(
                  "intermediaryFurtherCreditTo",
                  intermediaryFurtherCreditTo || "",
                  false,
                );
                setFieldValue("useIntermediaryAccount", useIntermediary, false);
              }
            }
          }

          if (values.useIntermediaryAccount !== storedUseIntermediary) {
            setStoredUseIntermediary(values.useIntermediaryAccount);
            if (!values.useIntermediaryAccount) {
              setFieldValue("intermediaryBankName", "", false);
              setFieldValue("intermediaryRoutingNumber", "", false);
              setFieldValue("intermediaryFurtherCreditTo", "", false);
            }
          }
        }, [values]);

        return (
          <Form>
            <IonList>
              <FormSelect
                label="Sending account"
                placeholder="Choose an account"
                name="sendingAccount"
                type="text"
                className="FormAccountSelect"
                options={accountOptions}
              />
              <FormSelect
                label="Receiving account"
                placeholder="Choose an account"
                name="receivingAccount"
                type="text"
                className="FormAccountSelect"
                options={externalAccountOptions}
              />
              <IonListHeader>Receiving account details</IonListHeader>
              <FormInput
                label="Financial institution name"
                name="externalFinancialInstitution"
                type="text"
              />
              <FormInput
                label="Account name"
                name="externalAccountName"
                type="text"
              />
              <FormInput
                label="Account number"
                name="externalAccountNumber"
                type="text"
              />
              <FormInput
                label="Routing number"
                name="externalRoutingNumber"
                type="text"
              />
              <FormSelect
                label="Transfer type"
                placeholder="Choose a type"
                name="type"
                type="text"
                className="FormAccountSelect"
                options={transferTypeOptions}
              />
              <FormCheckbox
                label="Use intermediary account?"
                name="useIntermediaryAccount"
                type="checkbox"
              />
              {values.useIntermediaryAccount && (
                <>
                  <FormInput
                    label="Intermediary bank name"
                    name="intermediaryBankName"
                    type="text"
                  />
                  <FormInput
                    label="Intermediary routing number"
                    name="intermediaryRoutingNumber"
                    type="text"
                  />
                  <FormInput
                    label="For further credit to"
                    name="intermediaryFurtherCreditTo"
                    type="text"
                  />
                </>
              )}
              <IonListHeader>Transfer details</IonListHeader>
              <FormInput label="Amount" name="amount" type="text" />
              <FormInput
                label="Memo (optional)"
                name="memo"
                type="text"
                note="Use letters and numbers only (up to 32 characters)"
              />
              <SubmitButton isSubmitting={isSubmitting}>
                Submit external transfer
              </SubmitButton>
            </IonList>
          </Form>
        );
      }}
    </Formik>
  );
}
