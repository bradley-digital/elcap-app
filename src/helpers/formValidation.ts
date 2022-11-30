import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const firstNameValidation = Yup.string().required("First Name required");

export const lastNameValidation = Yup.string().required("Last Name required");

export const emailValidation = Yup.string().email().required("Email required");

export const phoneValidation = Yup.string().matches(
  phoneRegExp,
  "Phone number is not valid"
);

export const passwordValidation = Yup.string()
  .required("Password required")
  .min(8)
  .max(28);

export const confirmPasswordValidation = Yup.string()
  .required("Password required")
  .min(8)
  .max(28)
  .oneOf([Yup.ref("password"), null], "Passwords must match.");
