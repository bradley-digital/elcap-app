import type { UseMutateAsyncFunction } from "react-query";
import type {
  Account,
  ExternalAccount,
  ExternalAccountCreateInput,
  Transfer,
  TransferCreateInput,
} from "./useWesternAllianceAccount";
import { useEffect, useState } from "react";
import {
  wireExternalAccountNameValidation,
  wireExternalAccountNumberValidation,
  wireExternalFinancialInstitutionValidation,
  wireExternalRoutingNumberValidation,
  wireIntermediaryBankNameValidation,
  wireIntermediaryFurtherCreditToValidation,
  wireIntermediaryRoutingNumberValidation,
  wireMemoValidation,
  wireReceivingAccountValidation,
  wireSendingAccountValidation,
  wireUseIntermediaryAccountValidation,
  wireTypeValidation,
  transferDateValidation,
} from "lib/formValidation";
import * as Yup from "yup";
import { currency } from "lib/formats";
import { useFormikContext } from "formik";

type Props = {
  accounts?: Account[];
  externalAccounts?: ExternalAccount[];
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
};

export default function useTransferExternal({
  accounts,
  externalAccounts,
  createExternalAccount,
  createTransfer,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storedReceivingAccount, setStoredReceivingAccount] = useState("");
  const [storedUseIntermediary, setStoredUseIntermediary] = useState(false);

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

  const initialValues: Yup.InferType<typeof validationSchema> = {
    amount: 0,
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
    type: "WIRE",
    transferDate: new Date().toISOString(),
  };

  const wireAmountValidation = Yup.number()
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

  const validationSchema = Yup.object({
    amount: wireAmountValidation,
    externalAccountName: wireExternalAccountNameValidation,
    externalAccountNumber: wireExternalAccountNumberValidation,
    externalFinancialInstitution: wireExternalFinancialInstitutionValidation,
    externalRoutingNumber: wireExternalRoutingNumberValidation,
    intermediaryBankName: wireIntermediaryBankNameValidation,
    intermediaryFurtherCreditTo: wireIntermediaryFurtherCreditToValidation,
    intermediaryRoutingNumber: wireIntermediaryRoutingNumberValidation,
    memo: wireMemoValidation,
    receivingAccount: wireReceivingAccountValidation,
    sendingAccount: wireSendingAccountValidation,
    useIntermediaryAccount: wireUseIntermediaryAccountValidation,
    type: wireTypeValidation,
    transferDate: transferDateValidation,
  });

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

  const submit = async (values: Yup.InferType<typeof validationSchema>) => {
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
        transferDate: new Date(values.transferDate),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ConditionalLogic = () => {
    const { values, submitForm, setFieldValue } =
      useFormikContext<Yup.InferType<typeof validationSchema>>();
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
            ({ accountNumber }) => accountNumber === values.receivingAccount
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
            setFieldValue("externalAccountNumber", accountNumber || "", false);
            setFieldValue(
              "externalFinancialInstitution",
              financialInstitution || "",
              false
            );
            setFieldValue("externalRoutingNumber", routingNumber || "", false);
            setFieldValue(
              "intermediaryBankName",
              intermediaryBankName || "",
              false
            );
            setFieldValue(
              "intermediaryRoutingNumber",
              intermediaryRoutingNumber || "",
              false
            );
            setFieldValue(
              "intermediaryFurtherCreditTo",
              intermediaryFurtherCreditTo || "",
              false
            );
            setFieldValue("useIntermediaryAccount", useIntermediary, false);
          }
        }
      }

      if (values.useIntermediaryAccount !== storedUseIntermediary) {
        setStoredUseIntermediary(values.useIntermediaryAccount || false);
        if (!values.useIntermediaryAccount) {
          setFieldValue("intermediaryBankName", "", false);
          setFieldValue("intermediaryRoutingNumber", "", false);
          setFieldValue("intermediaryFurtherCreditTo", "", false);
        }
      }
    }, [values, submitForm]);

    return null;
  };

  return {
    accountOptions,
    ConditionalLogic,
    externalAccountOptions,
    initialValues,
    isSubmitting,
    submit,
    transferTypeOptions,
    validationSchema,
  };
}
