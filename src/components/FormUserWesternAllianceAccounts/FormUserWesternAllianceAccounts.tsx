import { useState } from "react";

// components
import { Form, Formik, FieldArray } from "formik";
import { IonButton, IonList, IonListHeader, IonSpinner } from "@ionic/react";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// hooks
import type { Profile } from "hooks/useUser";
import useUserManagement from "hooks/useUserManagement";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

// styles
import "./FormUserWesternAllianceAccounts.scss";

type Props = {
  profile: Profile;
};

export default function FormUserWesternAllianceAccounts({ profile }: Props) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { accounts, accountsIsSuccess } = useWesternAllianceAccount();
  const { update } = useUserManagement();

  const { id, accounts: profileAccounts } = profile;

  const accountNumbers =
    profileAccounts?.map((account) => account.accountNumber) || [];

  const accountOptions =
    accounts
      ?.map((account) => {
        const truncatedAccountNumber = account.accountNumber.slice(-4);
        const label = `${account.accountTitle} (...${truncatedAccountNumber})`;
        return {
          value: account.accountNumber,
          label,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label)) || [];

  return (
    <Formik
      initialValues={{
        accounts: accountNumbers,
      }}
      onSubmit={(values) => {
        setIsSubmitting(true);
        update({ id, ...values });
        setIsSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form className="FormUserWesternAllianceAccounts">
          <IonList>
            <IonListHeader>Western Alliance Accounts</IonListHeader>
            <FieldArray
              name="accounts"
              render={(arrayHelpers) => (
                <>
                  {values.accounts.map((account, index) => (
                    <div key={index}>
                      {accountsIsSuccess && (
                        <FormSelect
                          className="FormAccountSelect"
                          label="Account"
                          name={`accounts.${index}`}
                          options={accountOptions}
                        />
                      )}
                      <IonButton onClick={() => arrayHelpers.remove(index)}>
                        Remove account
                      </IonButton>
                    </div>
                  ))}
                  <IonButton onClick={() => arrayHelpers.push("")}>
                    Add account
                  </IonButton>
                </>
              )}
            />
            <SubmitButton>
              {isSubmitting ? <IonSpinner name="crescent" /> : "Submit"}
            </SubmitButton>
          </IonList>
        </Form>
      )}
    </Formik>
  );
}
