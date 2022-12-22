import type { RouteComponentProps } from "react-router-dom";

// components
import SplitPaneTemplate from "components/SplitPaneTemplate/SplitPaneTemplate";
import PayRoutes from "routes/PayRoutes";

// consts
import { menuLinks } from "pages/Pay/consts";

export default function Pay(routeProps: RouteComponentProps) {
  return (
    <SplitPaneTemplate
      title="Pay"
      menuId="main"
      menuLinks={menuLinks}
    >
      <PayRoutes {...routeProps} />
    </SplitPaneTemplate>
  );
}
