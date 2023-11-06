import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import { receipt } from "ionicons/icons";
import { MenuLink } from "components/MenuLinks/MenuLinks";
import { RouteComponentProps } from "react-router";
import AccountManagementRoutes from "routes/AccountManagementRoutes";

export default function AccountManagement(routeProps: RouteComponentProps) {
  const { match } = routeProps;
  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: receipt,
      href: `${match.url}/western-alliance`,
      label: "Western Alliance",
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
