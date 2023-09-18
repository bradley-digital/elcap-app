// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import TransferHistory from "components/TransferHistory/TransferHistory";
import TransferHistoryModal from "components/TransferHistoryModal/TransferHistoryModal";

export default function TransferOverview() {
  return (
    <PageTemplate title="Transfer History" menuId="transfer">
      <TransferHistory />
      <TransferHistoryModal />
    </PageTemplate>
  );
}
