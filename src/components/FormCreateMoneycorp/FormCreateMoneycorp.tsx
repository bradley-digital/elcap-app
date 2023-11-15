import { useState } from "react";
import * as Yup from "yup";

// lib
import { userIdValidation, accountIdValidation } from "lib/formValidation";

// icons
import { pencil } from "ionicons/icons";

// components
import { Form, Formik } from "formik";
import { IonList } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import SubmitButton from "components/SubmitButton/SubmitButton";

//atoms
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/westernAllianceModal";

// hooks
import useMoneycorpAccount from "hooks/useMoneycorpAccount";
import useUserManagement from "hooks/useUserManagement";
import FormSelect from "components/FormSelect/FormSelect";

export default function FormCreateMoneycorp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsOpen] = useAtom(isOpenAtom);
  const { createAccount } = useMoneycorpAccount();

  const { data } = useUserManagement();
  const users: { value: string; label: string }[] = [];
  data?.forEach((user) => {
    user.role !== "ADMIN" &&
      users.push({
        value: user.id,
        label: user.companyName || `${user.firstName} ${user.lastName}`,
      });
  });

  return (
    <Formik
      initialValues={{
        userId: "",
        accountId: "",
      }}
      validationSchema={Yup.object({
        userId: userIdValidation,
        accountId: accountIdValidation,
      })}
      onSubmit={(values) => {
        setIsSubmitting(true);
        createAccount(values);
        setIsOpen(false);
        setIsSubmitting(false);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <IonList>
            <FormSelect
              label="Client"
              name="userId"
              options={users || []}
              onChange={(value: any) => {
                setFieldValue("userId", value);
              }}
            />
            <FormInput
              label="Account ID"
              name="accountId"
              type="text"
              icon={pencil}
            />
            <SubmitButton isSubmitting={isSubmitting}>
              Create New Account
            </SubmitButton>
          </IonList>
        </Form>
      )}
    </Formik>
  );
}
