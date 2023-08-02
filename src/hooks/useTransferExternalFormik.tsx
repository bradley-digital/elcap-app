import { wireExternalAccountNameValidation, wireExternalAccountNumberValidation, wireExternalFinancialInstitutionValidation, wireExternalRoutingNumberValidation, wireIntermediaryBankNameValidation, wireIntermediaryFurtherCreditToValidation, wireIntermediaryRoutingNumberValidation, wireMemoValidation, wireReceivingAccountValidation, wireSendingAccountValidation, wireUseIntermediaryAccountValidation, wireTypeValidation } from "lib/formValidation";
import * as Yup from "yup";
import { currency } from "lib/formats";
import { Account, ExternalAccount } from "./useWesternAllianceAccount";
import { useFormikContext } from "formik";
import { useEffect } from "react";

    
type IAutomate = {
  storedReceivingAccount: string
  setStoredReceivingAccount: (value:string)=>void
  storedUseIntermediary: boolean
  setStoredUseIntermediary: (value:boolean)=>void
}

export default function useTransferExternalFormik(accounts?: Account[], externalAccounts?: ExternalAccount[]){
    const initialValues ={
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
      }

  
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
    
    const validationSchema=Yup.object({
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
    })

    const accountOptions =
    accounts
      ?.map(({ accountBalance, accountNumber, accountName }) => {
        const truncatedAccountNumber = accountNumber.slice(-4);
        const label = `${accountName} (...${truncatedAccountNumber}): ${currency(
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

    const Automation = ({storedReceivingAccount, setStoredReceivingAccount, setStoredUseIntermediary, storedUseIntermediary}: IAutomate)=>{
      const { values, submitForm, setFieldValue } = useFormikContext<Yup.InferType<typeof validationSchema>>();
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
            setStoredUseIntermediary(values.useIntermediaryAccount || false);
            if (!values.useIntermediaryAccount) {
              setFieldValue("intermediaryBankName", "", false);
              setFieldValue("intermediaryRoutingNumber", "", false);
              setFieldValue("intermediaryFurtherCreditTo", "", false);
            }
          }
      }, [values, submitForm]);

      return null
    }

    return{
        initialValues,
        validationSchema,
        accountOptions,
        externalAccountOptions,
        Automation
    }
}