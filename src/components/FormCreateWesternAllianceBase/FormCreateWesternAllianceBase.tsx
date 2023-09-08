import { IonList } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";
import { Formik, Form } from "formik";
import useCreateAccount from "hooks/useCreateAccount";
import { Account, AccountCreateInput } from "hooks/useWesternAllianceAccount";
import { pencil } from "ionicons/icons";
import { PrimitiveAtom } from "jotai";
import { UseMutateFunction } from "react-query";

interface Props {
  createAccount: UseMutateFunction<
    Account,
    unknown,
    AccountCreateInput,
    unknown
  >;
  isOpenAtom: PrimitiveAtom<boolean>;
}

export default function FormCreatWesternAllianceBase({
  createAccount,
  isOpenAtom,
}: Props) {
  const { initialValues, isSubmitting, submit, validationSchema } =
    useCreateAccount({ createAccount, isOpenAtom });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form>
        <IonList>
          <FormInput label="Client" name="client" type="text" icon={pencil} />
          <FormInput
            label="Account Name"
            name="accountName"
            type="text"
            icon={pencil}
          />
          <FormInput
            label="Account Number"
            name="accountNumber"
            type="text"
            icon={pencil}
          />
          <FormInput label="Routing number" name="routingNumber" type="text" />
          <SubmitButton isSubmitting={isSubmitting}>
            Create New Account
          </SubmitButton>
        </IonList>
      </Form>
    </Formik>
  );
}
