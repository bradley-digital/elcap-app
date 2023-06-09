import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { exit, receipt, swapHorizontal } from "ionicons/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import TransferRoutes from "routes/TransferRoutes";

export default function Profile(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: receipt,
      href: `${match.url}/overview`,
      label: "Overview",
    },
    {
      id: 2,
      icon: swapHorizontal,
      href: `${match.url}/account`,
      label: "Account transfer",
    },
    {
      id: 3,
      icon: exit,
      href: `${match.url}/wire`,
      label: "Wire transfer",
    },
  ];

  return (
    <SplitPaneTemplate
      title="Money movement"
      menuId="transfer"
      menuLinks={menuLinks}
    >
      <TransferRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
