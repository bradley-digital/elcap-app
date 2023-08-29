import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { analytics, receipt } from "ionicons/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import DashboardRoutes from "routes/DashboardRoutes";

export default function Dashboard(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: analytics,
      href: `${match.url}/overview`,
      label: "Overview",
    },
    {
      id: 2,
      icon: receipt,
      href: `${match.url}/transactions`,
      label: "Transaction History",
    },
  ];

  return (
    <SplitPaneTemplate
      title="Dashboard"
      menuId="dashboard"
      menuLinks={menuLinks}
    >
      <DashboardRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
