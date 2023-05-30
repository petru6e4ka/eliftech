import React, {
  ChangeEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Box, TextField } from "../atoms";
import { useUserSelector } from "../../store/user";
import {
  userNameSchema,
  userEmailSchema,
  userAdressSchema,
  userPhoneSchema,
} from "../../utils/validations";
import { useActions } from "../../hooks";
import { IUser } from "@/constants/types";

export const CartForm = () => {
  const user: IUser = useUserSelector();
  const _user: IUser = useMemo(() => user, [user]);
  const { setUserName, setUserEmail, setUserPhone, setUserAdress } =
    useActions();

  const [name, setName] = useState(_user.name);
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState(_user.email);
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState(_user.phone);
  const [phoneError, setPhoneError] = useState("");
  const [adress, setAdress] = useState(_user.adress);
  const [adressError, setAdressError] = useState("");

  const onNameValidate = useCallback(
    async (name: string) => {
      await userNameSchema
        .validate(name)
        .then(() => {
          setNameError("");
          setUserName(name);
        })
        .catch((error) => setNameError(error));
    },
    [setUserName]
  );

  const onNameChange: ChangeEventHandler = useCallback(
    async (e) => {
      const { value } = e.target as HTMLInputElement;

      setName(value);
      onNameValidate(value);
    },
    [onNameValidate]
  );

  const onEmailValidate = useCallback(
    async (email: string) => {
      await userEmailSchema
        .validate(email)
        .then(() => {
          setEmailError("");
          setUserEmail(email);
        })
        .catch((error) => setEmailError(error));
    },
    [setUserEmail]
  );

  const onEmailChange: ChangeEventHandler = useCallback(
    async (e) => {
      const { value } = e.target as HTMLInputElement;

      setEmail(value);
      onEmailValidate(value);
    },
    [onEmailValidate]
  );

  const onPhoneValidate = useCallback(
    async (phone: string) => {
      await userPhoneSchema
        .validate(phone)
        .then(() => {
          setPhoneError("");
          setUserPhone(phone);
        })
        .catch((error) => setPhoneError(error));
    },
    [setUserPhone]
  );

  const onPhoneChange: ChangeEventHandler = useCallback(
    (e) => {
      const { value } = e.target as HTMLInputElement;

      setPhone(value);
      onPhoneValidate(value);
    },
    [onPhoneValidate]
  );

  const onAdressValidate = useCallback(
    async (adress: string) => {
      await userAdressSchema
        .validate(adress)
        .then(() => {
          setAdressError("");
          setUserAdress(adress);
        })
        .catch((error) => setAdressError(error));
    },
    [setUserAdress]
  );

  const onAdressChange: ChangeEventHandler = useCallback(
    (e) => {
      const { value } = e.target as HTMLInputElement;

      setAdress(value);
      onAdressValidate(value);
    },
    [onAdressValidate]
  );

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mb: 2 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        required
        value={name}
        onChange={onNameChange}
        error={!!nameError}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        required
        value={email}
        onChange={onEmailChange}
        error={!!emailError}
      />
      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        required
        value={phone}
        onChange={onPhoneChange}
        error={!!phoneError}
      />
      <TextField
        id="outlined-basic"
        label="Adress"
        variant="outlined"
        required
        value={adress}
        onChange={onAdressChange}
        error={!!adressError}
      />
    </Box>
  );
};

export default CartForm;
