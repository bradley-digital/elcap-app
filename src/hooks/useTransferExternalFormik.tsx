import { wireExternalAccountNameValidation, wireExternalAccountNumberValidation, wireExternalFinancialInstitutionValidation, wireExternalRoutingNumberValidation, wireIntermediaryBankNameValidation, wireIntermediaryFurtherCreditToValidation, wireIntermediaryRoutingNumberValidation, wireMemoValidation, wireReceivingAccountValidation, wireSendingAccountValidation, wireUseIntermediaryAccountValidation, wireTypeValidation } from "lib/formValidation";
import * as Yup from "yup";
import { currency } from "lib/formats";
import { Account, ExternalAccount } from "./useWesternAllianceAccount";

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
    
    return{
        initialValues,
        validationSchema,
        accountOptions,
        externalAccountOptions,
    }
}