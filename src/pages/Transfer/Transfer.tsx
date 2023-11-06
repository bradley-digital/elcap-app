import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { swapHorizontal } from "ionicons/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import TransferRoutes from "routes/TransferRoutes";

export default function Transfer(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: swapHorizontal,
      label: "Domestic Transfers",
      menuLinks: [
        {
          id: 1,
          href: `${match.url}/overview`,
          label: "Overview",
        },
        {
          id: 2,
          href: `${match.url}/account`,
          label: "Between Account Transfer",
        },
        {
          id: 3,
          href: `${match.url}/external`,
          label: "External Transfer",
        },
        {
          id: 4,
          href: `${match.url}/instructions`,
          label: "Deposit Instructions",
        },
      ],
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
