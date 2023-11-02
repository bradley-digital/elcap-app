import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import { exit, receipt } from "ionicons/icons";
import { MenuLink } from "components/MenuLinks/MenuLinks";
import { RouteComponentProps } from "react-router";
import MoneyMovementRoutes from "routes/MoneyMovementRoutes";

export default function MoneyMovement(routeProps: RouteComponentProps) {
  const { match } = routeProps;
  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: receipt,
      label: "Overview",
      menuLinks: [
        {
          href: `${match.url}/overview`,
          label: "Account",
          id: 1,
        },
        {
          href: `${match.url}/transfer`,
          label: "Balance",
          id: 1,
        },
      ],
    },
    {
      id: 2,
      icon: exit,
      href: `${match.url}/transfer`,
      label: "External Transfer",
    },
  ];

  return (
    <SplitPaneTemplate
      title="Money Movement"
      menuId="money-movement"
      menuLinks={menuLinks}
    >
      <MoneyMovementRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
