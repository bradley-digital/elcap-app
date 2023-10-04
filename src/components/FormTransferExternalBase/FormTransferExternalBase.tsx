import type { UseMutateAsyncFunction } from "react-query";
import { IonList, IonListHeader, IonNote, IonText } from "@ionic/react";
import FormCheckbox from "components/FormCheckbox/FormCheckbox";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";
import { Formik, Form } from "formik";
import useTransferExternal from "hooks/useTransferExternal";
import {
  Account,
  ExternalAccount,
  ExternalAccountCreateInput,
  Transfer,
  TransferCreateInput,
} from "hooks/useWesternAllianceAccount";
import FormDatePicker from "components/FormDatePicker/FormDatePicker";

type Props = {
  accounts?: Account[];
  createExternalAccount: UseMutateAsyncFunction<
    ExternalAccount,
    unknown,
    ExternalAccountCreateInput,
    unknown
  >;
  createTransfer: UseMutateAsyncFunction<
    Transfer,
    unknown,
    TransferCreateInput,
    unknown
  >;
  externalAccounts?: ExternalAccount[];
  showDocusign: boolean;
};

export default function FormTransferExternalBase({
  accounts,
  externalAccounts,
  showDocusign,
  createExternalAccount,
  createTransfer,
}: Props) {
  const {
    accountOptions,
    ConditionalLogic,
    externalAccountOptions,
    initialValues,
    isSubmitting,
    submit,
    transferTypeOptions,
    validationSchema,
    docuSigned,
    handleSignDocument,
  } = useTransferExternal({
    accounts,
    createExternalAccount,
    createTransfer,
    externalAccounts,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={showDocusign && docuSigned ? submit : handleSignDocument}
    >
      {({ values }) => (
        <Form>
          <ConditionalLogic />
          <IonList>
            <FormSelect
              label="Transfer type"
              placeholder="Select transfer type"
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
            <FormInput label="Amount" name="amount" type="number" />
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
            {showDocusign ? (
              docuSigned ? (
                <>
                  <IonText>
                    <p>
                      <sub>
                        <IonText color="success">&#10003;</IonText> DocuSign
                        form completed
                      </sub>
                    </p>
                  </IonText>
                  <SubmitButton isSubmitting={isSubmitting}>
                    Submit external transfer
                  </SubmitButton>
                </>
              ) : (
                <>
                  <SubmitButton isSubmitting={isSubmitting}>
                    Sign form
                  </SubmitButton>
                  <IonNote color="danger">
                    * Please make sure popups are enable
                  </IonNote>
                </>
              )
            ) : (
              <SubmitButton isSubmitting={isSubmitting}>
                Submit external transfer
              </SubmitButton>
            )}
          </IonList>
        </Form>
      )}
    </Formik>
  );
}
