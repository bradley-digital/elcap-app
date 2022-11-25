import { useLayoutEffect, useRef } from "react";

// hooks
import useAuth from "hooks/useAuth";
import useSessionTimeout from "hooks/useSessionTimeout";

// components
import { useIonRouter } from "@ionic/react";
import LoginRoutes from "./LoginRoutes";
import PaymentsRoutes from "./PaymentsRoutes";
import PortalRoutes from "./PortalRoutes";

export default function AuthRouter() {
  const { isAuthenticated, user } = useAuth();
  const router = useIonRouter();
  const startPath = useRef(router.routeInfo.pathname);

  useSessionTimeout();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.push(startPath.current);
    }
    // Only run when isAuthenticated changes
    /* eslint-disable-next-line */
  }, [isAuthenticated]);

  console.log(user);

  // do redirect base on roles. | ADMIN, PAYMENTS, PORTAL
  if (isAuthenticated && user?.role === "PAYMENTS") {
    return <PaymentsRoutes />;
  }

  if (isAuthenticated && user?.role === "PORTAL") {
    return <PortalRoutes />;
  }

  if (isAuthenticated && user?.role === "ADMIN") {
    return <PortalRoutes />;
  }

  return <LoginRoutes />;
}
