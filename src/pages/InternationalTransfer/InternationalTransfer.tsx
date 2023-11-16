import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import {
  exit,
  globeOutline,
  informationCircleOutline,
  receipt,
  swapHorizontal,
} from "ionicons/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import InternationalTransferRoutes from "routes/InternationalTransferRoutes";

export default function InternationalTransfer(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: receipt,
      href: "/money-movement/overview",
      label: "Overview",
    },
    {
      id: 2,
      icon: swapHorizontal,
      href: "/money-movement/account",
      label: "Between Account Transfer",
    },
    {
      id: 3,
      icon: exit,
      href: "/money-movement/external",
      label: "External Transfer",
    },
    {
      id: 4,
      icon: informationCircleOutline,
      href: "/money-movement/instructions",
      label: "Deposit Instructions",
    },
    {
      id: 5,
      icon: globeOutline,
      label: "International Transfers",
      menuLinks: [
        {
          id: 1,
          href: `${match.url}/overview`,
          label: "Overview",
        },
        {
          id: 2,
          href: `${match.url}/fund`,
          label: "Fund",
        },
        {
          id: 3,
          href: `${match.url}/pay`,
          label: "Pay",
        },
        {
          id: 4,
          href: `${match.url}/exchange`,
          label: "Exchange",
        },
        {
          id: 5,
          href: `${match.url}/exchange-pay`,
          label: "Exchange and Pay",
        },
      ],
    },
  ];

  return (
    <SplitPaneTemplate
      title="Money Movement"
      menuId="money-movement"
      menuLinks={menuLinks}
    >
      <InternationalTransferRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
