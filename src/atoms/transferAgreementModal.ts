import type { TransferCreateInput } from "hooks/useWesternAllianceAccount";
import { atom } from "jotai";

export const agreementUrlAtom = atom("");
export const isOpenAtom = atom(false);
export const transferBodyAtom = atom<TransferCreateInput | undefined>(undefined);
