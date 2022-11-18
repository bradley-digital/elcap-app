import { useLayoutEffect, useRef } from "react";

// hooks
import useAuth from "hooks/useAuth";
import useSessionTimeout from "hooks/useSessionTimeout";

// components
import { useIonRouter } from "@ionic/react";
import UserRoutes from "./UserRoutes";
import LoginRoutes from "./LoginRoutes";

export default function AuthRouter() {
  const { isAuthenticated } = useAuth();
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

  return isAuthenticated ? <UserRoutes /> : <LoginRoutes />;
}

