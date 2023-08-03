import * as Yup from "yup";

// components
import { IonList, IonListHeader } from "@ionic/react";
import { Form, Formik } from "formik";
import FormCheckbox from "components/FormCheckbox/FormCheckbox";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";
import useTransferExternal from "hooks/useTransferExternal";
import useTransferExternalFormik from "hooks/useTransferExternalFormik";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

export default function FormUserTransferExternal() {
  const {
    setStoredReceivingAccount,
    setStoredUseIntermediary,
    setIsSubmitting,
    storedReceivingAccount,
    storedUseIntermediary,
    isSubmitting,
    transferTypeOptions
  } = useTransferExternal()

  const { accounts, createExternalAccount, createTransfer, externalAccounts } = useWesternAllianceAccount();
  const {
    initialValues,
    validationSchema,
    accountOptions,
    externalAccountOptions,
    Automation
  } = useTransferExternalFormik(accounts, externalAccounts)

  const handleSubmit = async (values: Yup.InferType<typeof validationSchema>) => {
    try {
      setIsSubmitting(true);
      if (values.receivingAccount === "new") {
        await createExternalAccount({
          accountName: values.externalAccountName,
          accountNumber: values.externalAccountNumber,
          financialInstitution: values.externalFinancialInstitution,
          routingNumber: values.externalRoutingNumber,
          intermediaryBankName: values.intermediaryBankName,
          intermediaryFurtherCreditTo: values.intermediaryFurtherCreditTo,
          intermediaryRoutingNumber: values.intermediaryRoutingNumber,
          useIntermediary: values.useIntermediaryAccount || false,
        });
      }
      await createTransfer({
        amount: values.amount || 0,
        externalAccount:
          (values.receivingAccount !== "new" && values.receivingAccount) ||
          values.externalAccountNumber,
        fromAccount: values.sendingAccount,
        memo: values.memo,
        type: values.type,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <Automation
            setStoredReceivingAccount={setStoredReceivingAccount}
            setStoredUseIntermediary={setStoredUseIntermediary}
            storedReceivingAccount={storedReceivingAccount}
            storedUseIntermediary={storedUseIntermediary}
          />
          <IonList>
            <FormSelect
              label="Transfer type"
              placeholder="Choose a type"
              name="type"
              type="text"
              className="FormAccountSelect"
              options={transferTypeOptions}
            />
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
              Submit transfer
            </SubmitButton>
          </IonList>
        </Form>
      )
      }
    </Formik>
  );
}
