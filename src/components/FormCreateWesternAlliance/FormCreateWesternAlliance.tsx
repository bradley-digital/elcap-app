import { useState } from "react";
import * as Yup from "yup";

// lib
import {
  accountNumberValidation,
  accountNameValidation,
  routingNumberValidation,
  userIdValidation,
} from "lib/formValidation";

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
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";
import useUserManagement from "hooks/useUserManagement";
import FormSelect from "components/FormSelect/FormSelect";

export default function FormCreateWesternAlliance() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsOpen] = useAtom(isOpenAtom);
  const { createAccount } = useWesternAllianceAccount();

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
        accountNumber: "",
        accountName: "",
        userId: "",
        routingNumber: "",
      }}
      validationSchema={Yup.object({
        accountNumber: accountNumberValidation,
        accountName: accountNameValidation,
        userId: userIdValidation,
        routingNumber: routingNumberValidation,
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
            <FormInput
              label="Routing number"
              name="routingNumber"
              type="text"
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
