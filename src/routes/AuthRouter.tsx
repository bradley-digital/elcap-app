import { useLayoutEffect, useRef } from "react";

// hooks
import useAuth from "hooks/useAuth";
import useSessionTimeout from "hooks/useSessionTimeout";

// components
import { useIonRouter } from "@ionic/react";
import AdminRoutes from "./AdminRoutes";
import LoginRoutes from "./LoginRoutes";
import PaymentsRoutes from "./PaymentsRoutes";
import PortalRoutes from "./PortalRoutes";

export default function AuthRouter() {
  const { isAuthenticated, role } = useAuth();
  const router = useIonRouter();
  const startPath = useRef(router.routeInfo.pathname);

  useSessionTimeout();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.push(startPath.current);
    }
  }, [isAuthenticated]);

  // do redirect base on roles. | ADMIN, PAYMENTS, PORTAL
  if (isAuthenticated && role === "ADMIN") {
    return <AdminRoutes />;
  }

  if (isAuthenticated && role === "PAYMENTS") {
    return <PaymentsRoutes />;
  }

  if (isAuthenticated && role === "PORTAL") {
    return <PortalRoutes />;
  }

  return <LoginRoutes />;
}
