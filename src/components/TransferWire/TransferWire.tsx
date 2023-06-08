import { useState } from "react";
import * as Yup from "yup";

// lib
import { currency } from "lib/formats";
import {
  wireAmountValidation,
  wireExternalAccountNameValidation,
  wireExternalAccountNumberValidation,
  wireExternalFinancialInstitutionValidation,
  wireIntermediaryBankNameValidation,
  wireIntermediaryRoutingNumberValidation,
  wireIntermediaryFurtherCreditToValidation,
  wireMemoValidation,
  wireRecievingAccountValidation,
  wireSendingAccountValidation,
  wireUseIntermediaryAccountValidation,
} from "lib/formValidation";

// components
import { IonList, IonListHeader } from "@ionic/react";
import { Form, Formik } from "formik";
import FormCheckbox from "components/FormCheckbox/FormCheckbox";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";

export default function TransferWire() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accounts, externalAccounts } = useUserWesternAllianceAccount();

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
        recievingAccount: "",
        sendingAccount: "",
        useIntermediaryAccount: false,
      }}
      validationSchema={Yup.object({
        amount: wireAmountValidation,
        externalAccountName: wireExternalAccountNameValidation,
        externalAccountNumber: wireExternalAccountNumberValidation,
        externalFinancialInstitution: wireExternalFinancialInstitutionValidation,
        externalRoutingNumber: wireIntermediaryBankNameValidation,
        intermediaryBankName: wireIntermediaryBankNameValidation,
        intermediaryFurtherCreditTo: wireIntermediaryFurtherCreditToValidation,
        intermediaryRoutingNumber: wireIntermediaryRoutingNumberValidation,
        memo: wireMemoValidation,
        recievingAccount: wireRecievingAccountValidation,
        sendingAccount: wireSendingAccountValidation,
        useIntermediaryAccount: wireUseIntermediaryAccountValidation,
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        console.log(values);
        setIsSubmitting(false);
      }}
    >
      {({ values, setFieldValue }) => {

        if (values.recievingAccount !== "new") {
          const externalAccount = externalAccounts?.find(({ accountNumber }) => accountNumber === values.recievingAccount);
          if (externalAccount) {
            const {
              accountName,
              accountNumber,
              financialInstitution,
              intermediaryBankName,
              intermediaryFurtherCreditTo,
              intermediaryRoutingNumber,
              routingNumber,
            } = externalAccount;
            if (values.externalAccountName === "" && accountName) {
              setFieldValue("externalAccountName", accountName, false);
            }
            if (values.externalAccountNumber === "" && accountNumber) {
              setFieldValue("externalAccountNumber", accountNumber, false);
            }
            if (values.externalFinancialInstitution === "" && financialInstitution) {
              setFieldValue("externalFinancialInstitution", financialInstitution, false);
            }
            if (values.externalRoutingNumber === "" && routingNumber) {
              setFieldValue("externalRoutingNumber", routingNumber, false);
            }
            if (values.intermediaryBankName === "" && intermediaryBankName) {
              setFieldValue("intermediaryBankName", intermediaryBankName, false);
            }
            if (values.intermediaryRoutingNumber === "" && intermediaryRoutingNumber) {
              setFieldValue("intermediaryRoutingNumber", intermediaryRoutingNumber, false);
            }
            if (values.intermediaryFurtherCreditTo === "" && intermediaryFurtherCreditTo) {
              setFieldValue("intermediaryFurtherCreditTo", intermediaryFurtherCreditTo, false);
            }
            if (
              values.useIntermediaryAccount === false && (
                intermediaryBankName ||
                intermediaryFurtherCreditTo ||
                intermediaryRoutingNumber
              )
            ) {
              setFieldValue("useIntermediaryAccount", true, false);
            }
          }
        }

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
                name="recievingAccount"
                type="text"
                className="FormAccountSelect"
                options={externalAccountOptions}
              />
              <IonListHeader>
                Receiving account details
              </IonListHeader>
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
              <IonListHeader>
                Transfer details
              </IonListHeader>
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
        );
      }}
    </Formik>
  );
}
