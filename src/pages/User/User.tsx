import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { arrowBack, business, create, personCircle, } from "ionicons/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import UserRoutes from "routes/UserRoutes";

export default function User(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: arrowBack,
      href: "/user-management",
      label: "User list",
    },
    {
      id: 2,
      icon: personCircle,
      href: `${match.url}/profile`,
      label: "Profile",
    },
    {
      id: 3,
      icon: business,
      href: `${match.url}/western-alliance`,
      label: "Western Alliance",
    },
    {
      id: 4,
      icon: create,
      href: `${match.url}/docfox`,
      label: "DocFox",
    },
  ];

  return (
    <SplitPaneTemplate title="User management" menuId="user" menuLinks={menuLinks}>
      <UserRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
