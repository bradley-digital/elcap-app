// hooks
import useUserWesternAllianceAccount from "hooks/useUserWesternAllianceAccount";
import FormTransferExternalBase from "components/FormTransferExternalBase/FormTransferExternalBase";

export default function FormTransferExternal() {
  const { accounts, createExternalAccount, createTransfer, externalAccounts } =
    useUserWesternAllianceAccount();

  return (
    <FormTransferExternalBase
      accounts={accounts}
      createExternalAccount={createExternalAccount}
      createTransfer={createTransfer}
      externalAccounts={externalAccounts}
    />
  );
}
