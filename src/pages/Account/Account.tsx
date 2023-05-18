import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { arrowBack, business } from "ionicons/icons";

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
      icon: business,
      href: `${match.url}/western-alliance`,
      label: "Western Alliance",
    },
  ];

  return (
    <SplitPaneTemplate
      title="Account management"
      menuId="account"
      menuLinks={menuLinks}
    >
      <AccountRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
