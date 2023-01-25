import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const firstNameValidation = Yup.string().required("First Name required");

export const lastNameValidation = Yup.string().required("Last Name required");

export const addressLine1Validation = Yup.string().required("Address required");

export const addressLine2Validation = Yup.string();

export const countryValidation = Yup.string().required("Country required");

export const roleValidation = Yup.string().required("Role required");

export const stateValidation = Yup.string().when("country", {
  is: (val: string) => val === "United States",
  then: (schema) => schema.required("State required"),
  otherwise: (schema) => schema,
});

export const emailValidation = Yup.string()
  .email("Email must be valid")
  .required("Email required");

export const phoneValidation = Yup.string()
  .matches(phoneRegExp, "Phone number is not valid")
  .required("Phone number required");

export const passwordValidation = Yup.string()
  .min(8, "Must be at least 8 characters long")
  .max(36, "Must be less than 36 characters long")
  .required("Password required");

export const confirmPasswordValidation = Yup.string()
  .min(8, "Must be at least 8 characters long")
  .max(36, "Must be less than 36 characters long")
  .oneOf([Yup.ref("password"), null], "Passwords must match.")
  .required("Password required");
