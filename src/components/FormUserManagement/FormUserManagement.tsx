import type { Profile } from "hooks/useUser";
import * as Yup from "yup";

// lib
import {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  phoneValidation,
  addressLine1Validation,
  addressLine2Validation,
  countryValidation,
  stateValidation,
  roleValidation,
} from "lib/formValidation";

// icons
import { lockClosed, pencil } from "ionicons/icons";

// components
import { Form, Formik, FieldArray } from "formik";
import { IonButton, IonList, IonListHeader } from "@ionic/react";
import FormInput from "components/FormInput/FormInput";
import FormSelect from "components/FormSelect/FormSelect";
import SubmitButton from "components/SubmitButton/SubmitButton";

// atoms
import { useAtom } from "jotai";
import { isOpenAtom } from "atoms/userListModal";

// hooks
import useUserManagement from "hooks/useUserManagement";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";
import { useTemplates } from "hooks/useDocfox";

const roleOptions = [
  {
    value: "ADMIN",
    label: "ADMIN",
  },
  {
    value: "PAYMENTS",
    label: "PAYMENTS",
  },
  {
    value: "PORTAL",
    label: "PORTAL",
  },
];

type Props = {
  profile: Profile;
};

export default function FormUserManagement({ profile }: Props) {
  const { accounts, accountsIsSuccess } = useWesternAllianceAccount();
  const { update } = useUserManagement();
  const { templates, templatesIsSuccess } = useTemplates();
  const [, setIsOpen] = useAtom(isOpenAtom);

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    addressLine2,
    country,
    state,
    role: origRole,
    accounts: profileAccounts,
  } = profile;

  const accountNumbers = profileAccounts ? profileAccounts.map(account => account.accountNumber) : [];

  const accountOptions = accounts ? accounts.map(account => {
    return {
      value: account.accountNumber,
      label: account.accountNumber,
    };
  }) : [];

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        email,
        phone,
        addressLine1,
        addressLine2,
        country,
        state,
        role: origRole,
        accounts: accountNumbers,
      }}
      validationSchema={Yup.object({
        firstName: firstNameValidation,
        lastName: lastNameValidation,
        email: emailValidation,
        phone: phoneValidation,
        addressLine1: addressLine1Validation,
        addressLine2: addressLine2Validation,
        country: countryValidation,
        state: stateValidation,
        role: roleValidation,
      })}
      onSubmit={(values) => {
        update({ id, ...values });
        setIsOpen(false);
      }}
    >
      {({ values }) => (
        <Form>
          <IonList>
            <IonListHeader>
              Account Details
            </IonListHeader>

            <FormInput
              label="First Name"
              name="firstName"
              type="text"
              icon={pencil}
            />

            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              icon={pencil}
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              icon={lockClosed}
              readonly={true}
            />

            <FormInput label="Phone" name="phone" type="text" icon={pencil} />

            <FormInput
              label="Address line 1"
              name="addressLine1"
              type="text"
              icon={pencil}
            />

            <FormInput
              label="Address line 2"
              name="addressLine2"
              type="text"
              icon={pencil}
            />

            <FormInput label="Country" name="country" type="text" icon={pencil} />

            <FormInput label="State" name="state" type="text" icon={pencil} />

            <FormSelect
              label="Role"
              name="role"
              options={roleOptions}
            />

            {values.role === "PORTAL" && (
              <>
                <IonListHeader>
                  Western Alliance Accounts
                </IonListHeader>
                <FieldArray
                  name="accounts"
                  render={arrayHelpers => (
                    <>
                      {values.accounts.map((account, index) => (
                        <div key={index}>
                          {accountsIsSuccess && (
                            <FormSelect
                              label="Account"
                              name={`accounts.${index}`}
                              options={accountOptions}
                            />
                          )}
                          <IonButton onClick={() => arrayHelpers.remove(index)}>
                            -
                          </IonButton>
                        </div>
                      ))}
                      <IonButton onClick={() => arrayHelpers.push("")}>
                        Add account
                      </IonButton>
                    </>
                  )}
                />

                <IonListHeader>
                  DocFox KYC
                </IonListHeader>

                {/*templatesIsSuccess && typeof templates !== "undefined" && (
                )*/}
              </>
            )}

            <SubmitButton>Update</SubmitButton>
          </IonList>
        </Form>
      )}
    </Formik>
  );
}
