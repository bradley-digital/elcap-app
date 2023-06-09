import * as Yup from "yup";

export const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const numberRegExp = /[0-9]/g;
export const symbolRegExp = /[^a-zA-Z0-9\s]/g;
export const firstNameValidation = Yup.string().required("First Name required");
export const lastNameValidation = Yup.string().required("Last Name required");
export const addressLine1Validation = Yup.string().required("Address required");
export const addressLine2Validation = Yup.string().nullable();
export const countryValidation = Yup.string().required("Country required");
export const companyNameValidation = Yup.string().nullable();
export const roleValidation = Yup.string().required("Role required");
export const accountBalanceValidation = Yup.number().nullable();
export const transferFromAccountValidation = Yup.string().nullable();
export const transferToAccountValidation = Yup.string().nullable();
export const transferAmountValidation = Yup.number().nullable();
export const transferMemoValidation = Yup.string().nullable();
export const wireAmountValidation = Yup.number().nullable();
export const wireExternalAccountNameValidation = Yup.string().nullable();
export const wireExternalAccountNumberValidation = Yup.string().nullable();
export const wireExternalFinancialInstitutionValidation = Yup.string().nullable();
export const wireIntermediaryBankNameValidation = Yup.string().nullable();
export const wireIntermediaryRoutingNumberValidation = Yup.string().nullable();
export const wireIntermediaryFurtherCreditToValidation = Yup.string().nullable();
export const wireMemoValidation = Yup.string().nullable();
export const wireReceivingAccountValidation = Yup.string().nullable();
export const wireSendingAccountValidation = Yup.string().nullable();
export const wireUseIntermediaryAccountValidation = Yup.boolean().nullable();

export const accountTitleValidation = Yup.string().required(
  "Account Title required"
);

export const clientValidation = Yup.string().required("Client required");

export const emailValidation = Yup.string()
  .email("Email must be valid")
  .required("Email required");

export const stateValidation = Yup.string().when("country", {
  is: (val: string) => val === "United States",
  then: (schema) => schema.required("State required"),
  otherwise: (schema) => schema,
});

export const phoneValidation = Yup.string()
  .matches(phoneRegExp, "Phone number must be valid")
  .required("Phone number required");

export const passwordValidation = Yup.string()
  .min(8, "Must be at least 8 characters long")
  .max(36, "Must be less than 36 characters long")
  .matches(numberRegExp, "Must contain a number")
  .matches(symbolRegExp, "Must contain a special character (!@#$%^&*)")
  .required("Password required");

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Password required");

export const accountNumberValidation = Yup.string()
  .min(8, "Must be at least 8 characters long")
  .max(36, "Must be less than 36 characters long")
  .required("Account Number required");
