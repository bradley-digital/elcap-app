import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { arrowBack } from "ionicons/icons";

// lib
import { westernAlliance } from "lib/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import AccountRoutes from "routes/AccountRoutes";

export default function Account(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: arrowBack,
      href: "/account-management",
      label: "All accounts",
    },
    {
      id: 2,
      icon: westernAlliance,
      href: `${match.url}/western-alliance`,
      label: "Western Alliance",
    },
  ];

  return (
    <SplitPaneTemplate
      title="Account Management"
      menuId="account"
      menuLinks={menuLinks}
    >
      <AccountRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
