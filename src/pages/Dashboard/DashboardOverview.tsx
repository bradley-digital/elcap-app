// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import DashboardOveriew from "components/DashboardOverview/DashboardOverview";

// hooks
import useUser from "hooks/useUser";

export default function DashboardOverview() {
  const { data: userData } = useUser();

  return (
    <PageTemplate
      title={(userData && userData.companyName) || ""}
      menuId="dashboard"
    >
      <DashboardOveriew />
    </PageTemplate>
  );
}
