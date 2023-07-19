import * as Yup from "yup";

export const numberRegExp = /[0-9]/g;
export const alphanumericRegExp = /^[a-zA-Z0-9\s]+$/g;
export const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const symbolRegExp = /[^a-zA-Z0-9\s]/g;

export const accountBalanceValidation = Yup.number().nullable();
export const accountNumberValidation = Yup.string()
  .min(8, "Must be at least 8 characters long")
  .max(36, "Must be less than 36 characters long")
  .required("Account Number required");
export const accountTitleValidation = Yup.string().required(
  "Account Title required",
);
export const addressLine1Validation = Yup.string().required("Address required");
export const addressLine2Validation = Yup.string().nullable();
export const clientValidation = Yup.string().required("Client required");
export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Password required");
export const otpValidation = Yup.string().required("Authentication code required");
export const companyNameValidation = Yup.string().nullable();
export const countryValidation = Yup.string().required("Country required");
export const emailValidation = Yup.string()
  .email("Email must be valid")
  .required("Email required");
export const firstNameValidation = Yup.string().required("First Name required");
export const lastNameValidation = Yup.string().required("Last Name required");
export const passwordValidation = Yup.string()
  .min(8, "Must be at least 8 characters long")
  .max(36, "Must be less than 36 characters long")
  .matches(numberRegExp, "Must contain a number")
  .matches(symbolRegExp, "Must contain a special character (!@#$%^&*)")
  .required("Password required");
export const phoneValidation = Yup.string()
  .matches(phoneRegExp, "Phone number must be valid")
  .required("Phone number required");
export const roleValidation = Yup.string().required("Role required");
export const isCannabisValidation = Yup.boolean();
export const stateValidation = Yup.string().when("country", {
  is: (val: string) => val === "United States",
  then: (schema) => schema.required("State required"),
  otherwise: (schema) => schema,
});
export const transferFromAccountValidation = Yup.string().required(
  "Transfer from account required",
);
export const transferMemoValidation = Yup.string()
  .matches(alphanumericRegExp, "Must be letters and numbers only")
  .max(32, "Must be less than 32 characters");
export const transferToAccountValidation = Yup.string().required(
  "Transfer to account required",
);
export const wireExternalAccountNameValidation = Yup.string().required(
  "Account name is required",
);
export const wireExternalAccountNumberValidation = Yup.string()
  .min(9, "Must be at least 9 characters")
  .max(18, "Must be less than 18 chracters")
  .matches(numberRegExp, "Must contain only numbers")
  .required("Account number is required");
export const wireExternalFinancialInstitutionValidation = Yup.string().required(
  "Financial institution name is required",
);
export const wireExternalRoutingNumberValidation = Yup.string()
  .length(9, "Must be 9 characters in length")
  .matches(numberRegExp, "Must contain only numbers")
  .required("Routing number is required");
export const wireIntermediaryBankNameValidation = Yup.string().when(
  "useIntermediaryAccount",
  {
    is: (val: boolean) => val === true,
    then: (schema) => schema.required("Intermediary bank name is required"),
    otherwise: (schema) => schema,
  },
);
export const wireIntermediaryRoutingNumberValidation = Yup.string().when(
  "useIntermediaryAccount",
  {
    is: (val: boolean) => val === true,
    then: (schema) =>
      schema
        .length(9, "Must be 9 characters in length")
        .matches(numberRegExp, "Must contain only numbers")
        .required("Routing number is required"),
    otherwise: (schema) => schema,
  },
);
export const wireIntermediaryFurtherCreditToValidation = Yup.string();
export const wireMemoValidation = Yup.string()
  .matches(alphanumericRegExp, "Must be letters and numbers only")
  .max(32, "Must be less than 32 characters");
export const wireReceivingAccountValidation = Yup.string().required(
  "Receiving account required",
);
export const wireSendingAccountValidation = Yup.string().required(
  "Sending account required",
);
export const wireUseIntermediaryAccountValidation = Yup.boolean();
