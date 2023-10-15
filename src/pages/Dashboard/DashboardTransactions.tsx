import PageTemplate from "components/PageTemplate/PageTemplate";
import TransactionsTable from "components/TransactionsTable/TransactionsTable";

export default function DashboardTransactions() {
  return (
    <PageTemplate title="Transaction History" menuId="dashboard">
      <TransactionsTable />
    </PageTemplate>
  );
}
