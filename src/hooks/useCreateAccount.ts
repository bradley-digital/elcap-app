import {
  accountNumberValidation,
  accountNameValidation,
  clientValidation,
  routingNumberValidation,
} from "lib/formValidation";
import * as Yup from "yup";
import { Account, AccountCreateInput } from "./useWesternAllianceAccount";
import { UseMutateFunction } from "react-query";
import { useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";

interface Props {
  createAccount: UseMutateFunction<
    Account,
    unknown,
    AccountCreateInput,
    unknown
  >;
  isOpenAtom: PrimitiveAtom<boolean>;
}

export default function useCreateAccount({ createAccount, isOpenAtom }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsOpen] = useAtom(isOpenAtom);

  const initialValues: Yup.InferType<typeof validationSchema> = {
    accountNumber: "",
    accountName: "",
    client: "",
    routingNumber: "",
  };

  const validationSchema = Yup.object({
    accountNumber: accountNumberValidation,
    accountName: accountNameValidation,
    client: clientValidation,
    routingNumber: routingNumberValidation,
  });

  const submit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    createAccount(values);
    setIsOpen(false);
    setIsSubmitting(false);
  };

  return {
    initialValues,
    validationSchema,
    submit,
    isSubmitting,
  };
}
