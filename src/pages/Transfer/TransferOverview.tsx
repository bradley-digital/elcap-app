// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import TransferHistory from "components/TransferHistory/TransferHistory";

export default function TransferOverview() {
  return (
    <PageTemplate title="Transfer History" menuId="transfer">
      <TransferHistory />
    </PageTemplate>
  );
}
