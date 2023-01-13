import { atom } from 'jotai';
import { Profile } from "hooks/useUser";

export const defaultUser: Profile = {
  id: "",
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  createdAt: "",
  role: "",
};

export const isOpenAtom = atom(false);

export const userAtom = atom(defaultUser);
