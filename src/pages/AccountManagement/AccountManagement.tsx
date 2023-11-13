import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import { MenuLink } from "components/MenuLinks/MenuLinks";
import { RouteComponentProps } from "react-router";
import AccountManagementRoutes from "routes/AccountManagementRoutes";
import { moneycorp, westernAlliance } from "lib/icons";

export default function AccountManagement(routeProps: RouteComponentProps) {
  const { match } = routeProps;
  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: westernAlliance,
      href: `${match.url}/western-alliance`,
      label: "Western Alliance",
    },
    {
      id: 2,
      icon: moneycorp,
      href: `${match.url}/moneycorp`,
      label: "Moneycorp",
    },
  ];

  return (
    <SplitPaneTemplate
      title="Account Management"
      menuId="account-management"
      menuLinks={menuLinks}
    >
      <AccountManagementRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
