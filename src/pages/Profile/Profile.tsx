import type { RouteComponentProps } from "react-router-dom";
import type { MenuLink } from "components/MenuLinks/MenuLinks";
import { create, personCircle } from "ionicons/icons";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import ProfileRoutes from "routes/ProfileRoutes";

export default function Profile(routeProps: RouteComponentProps) {
  const { match } = routeProps;

  const menuLinks: MenuLink[] = [
    {
      id: 1,
      icon: personCircle,
      href: `${match.url}/overview`,
      label: "Overview",
    },
    {
      id: 2,
      icon: create,
      href: `${match.url}/onboarding`,
      label: "Onboarding",
    },
  ];

  return (
    <SplitPaneTemplate title="Profile" menuId="profile" menuLinks={menuLinks}>
      <ProfileRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
