import { atom } from "jotai";
import { Profile } from "hooks/useUser";

export const defaultUser: Profile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  country: "",
  state: "",
  role: "",
  createdAt: "",
  accounts: [
    { accountNumber: "" },
  ],
};

export const isOpenAtom = atom(false);

export const userAtom = atom(defaultUser);
