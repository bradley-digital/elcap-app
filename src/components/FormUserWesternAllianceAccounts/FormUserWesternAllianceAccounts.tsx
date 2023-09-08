import type { Profile } from "hooks/useUser";
import { useEffect, useState } from "react";

// components
import {
  IonCheckbox,
  IonLabel,
  IonList,
  IonItem,
  IonAlert,
} from "@ionic/react";

// hooks
import useUserManagement from "hooks/useUserManagement";
import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";

// styles
import "./FormUserWesternAllianceAccounts.scss";

type Props = {
  profile: Profile;
};

export default function FormUserWesternAllianceAccounts({ profile }: Props) {
  const [activeAccounts, setActiveAccounts] = useState<string[]>([]);
  const [openConfirmAccountSelection, setOpenConfirmAccountSelection] =
    useState<{ isOpen: boolean; accountNumber: string; accountName: string }>({
      isOpen: false,
      accountNumber: "",
      accountName: "",
    });

  const { accounts } = useWesternAllianceAccount();
  const { update } = useUserManagement();

  const { id, accounts: profileAccounts, firstName, lastName } = profile;

  useEffect(() => {
    const accountNumbers =
      profileAccounts?.map((account) => account.accountNumber) || [];
    setActiveAccounts(accountNumbers);
  }, [profileAccounts]);

  const accountOptions =
    accounts?.map((account) => {
      const truncatedAccountNumber = account.accountNumber.slice(-4);
      const label = `${account.accountName} (...${truncatedAccountNumber})`;
      return {
        value: account.accountNumber,
        label,
      };
    }) || [];

  function handleCheckbox(value: string) {
    const newActiveAccounts = [...activeAccounts];
    const index = newActiveAccounts.indexOf(value);
    if (index > -1) {
      newActiveAccounts.splice(index, 1);
    } else {
      newActiveAccounts.push(value);
    }
    setActiveAccounts(newActiveAccounts);
    update({ id, accounts: newActiveAccounts });
  }

  function handleConfirmAccountSelection({
    accountNumber,
    accountName,
  }: {
    accountNumber: string;
    accountName: string;
  }) {
    setOpenConfirmAccountSelection({
      isOpen: true,
      accountNumber,
      accountName,
    });
  }

  return (
    <IonList className="FormUserWesternAllianceAccounts">
      <IonAlert
        isOpen={openConfirmAccountSelection.isOpen}
        subHeader={`You are about give ${firstName} ${lastName} access to ${openConfirmAccountSelection.accountName}.`}
        message="Are you sure this is correct?"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () =>
              setOpenConfirmAccountSelection({
                isOpen: false,
                accountNumber: "",
                accountName: "",
              }),
          },
          {
            text: "OK",
            role: "confirm",
            handler: () =>
              handleCheckbox(openConfirmAccountSelection.accountNumber),
          },
        ]}
        onDidDismiss={() =>
          setOpenConfirmAccountSelection({
            isOpen: false,
            accountNumber: "",
            accountName: "",
          })
        }
      />
      {accountOptions.map(({ label, value }) => (
        <IonItem key={value}>
          <IonCheckbox
            className="FormUserWesternAllianceAccounts__checkbox"
            checked={activeAccounts.includes(value)}
            onClick={() => {
              if (activeAccounts.includes(value)) {
                handleCheckbox(value);
              } else {
                handleConfirmAccountSelection({
                  accountNumber: value,
                  accountName: label,
                });
              }
            }}
          />
          <IonLabel>{label}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
