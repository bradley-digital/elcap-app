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
      label: "Between Account Transfer",
    },
    {
      id: 3,
      icon: exit,
      href: `${match.url}/external`,
      label: "External Transfer",
    },
  ];

  return (
    <SplitPaneTemplate
      title="Money Movement"
      menuId="transfer"
      menuLinks={menuLinks}
    >
      <TransferRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
