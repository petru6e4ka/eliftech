import { string } from "yup";

const phoneRegExp = /^\+[1-9]{1}[0-9]{3,14}$/;

export const userNameSchema = string().required().min(2);

export const userEmailSchema = string().required().email();

export const userPhoneSchema = string().matches(
  phoneRegExp,
  "Phone number is not valid"
);

export const userAdressSchema = string().required().min(3);
