import PageTemplate from "components/PageTemplate/PageTemplate";
import DashboardOveriew from "components/DashboardOverview/DashboardOverview";

export default function Dashboard() {
  return (
    <PageTemplate title="Dashboard" className="Dashboard">
      <DashboardOveriew />
    </PageTemplate>
  );
}
