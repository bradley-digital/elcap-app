import type { RouteComponentProps } from "react-router-dom";

// components
import AccountRoutes from "routes/AccountRoutes";
import PageTemplate from "components/PageTemplate/PageTemplate";

export default function Account(routeProps: RouteComponentProps) {
  return (
    <PageTemplate title="Account Management" showLogo>
      <AccountRoutes {...routeProps} />
    </PageTemplate>
  );
}
