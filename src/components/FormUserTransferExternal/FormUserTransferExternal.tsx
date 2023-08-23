import useWesternAllianceAccount from "hooks/useWesternAllianceAccount";
import FormTransferExternalBase from "components/FormTransferExternalBase/FormTransferExternalBase";

export default function FormUserTransferExternal() {
  const { accounts, createExternalAccount, createTransfer, externalAccounts } =
    useWesternAllianceAccount();

  return (
    <FormTransferExternalBase
      accounts={accounts}
      createExternalAccount={createExternalAccount}
      showDocusign={false}
      createTransfer={createTransfer}
      externalAccounts={externalAccounts}
    />
  );
}
