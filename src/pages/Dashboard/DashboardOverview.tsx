// components
import PageTemplate from "components/PageTemplate/PageTemplate";
import DashboardOveriew from "components/DashboardOverview/DashboardOverview";

// hooks
import useUser from "hooks/useUser";

export default function DashboardOverview() {
  const { profile } = useUser();

  return (
    <PageTemplate
      title={(profile && profile.companyName) || ""}
      menuId="dashboard"
    >
      <DashboardOveriew />
    </PageTemplate>
  );
}
