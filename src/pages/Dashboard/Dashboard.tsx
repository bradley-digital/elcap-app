import PageTemplate from "components/PageTemplate/PageTemplate";
import DashboardOveriew from "components/DashboardOverview/DashboardOverview";
import TransactionsTable from "components/TransactionsTable/TransactionsTable";

export default function Dashboard() {
  return (
    <PageTemplate title="Dashboard" className="Dashboard">
      <DashboardOveriew />
      <TransactionsTable />
    </PageTemplate>
  );
}
