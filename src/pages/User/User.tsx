import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { arrowBack, create, personCircle } from "ionicons/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import UserRoutes from "routes/UserRoutes";
import { moneycorp, westernAlliance } from "lib/icons";

export default function User(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: arrowBack,
      href: "/user-management",
      label: "All users",
    },
    {
      id: 2,
      icon: personCircle,
      href: `${match.url}/profile`,
      label: "Profile",
    },
    {
      id: 3,
      icon: westernAlliance,
      href: `${match.url}/western-alliance`,
      label: "Western Alliance",
    },
    {
      id: 4,
      icon: create,
      href: `${match.url}/docfox`,
      label: "DocFox",
    },
    {
      id: 5,
      icon: moneycorp,
      href: `${match.url}/moneycorp`,
      label: "Moneycorp",
    },
  ];

  return (
    <SplitPaneTemplate
      title="User Management"
      menuId="user"
      menuLinks={menuLinks}
    >
      <UserRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
