import { IonReactRouter } from "@ionic/react-router";

// hooks
import useAuth from "hooks/useAuth";
import { useEffect } from "react";

// components
import AdminRoutes from "./RoutesAdmin";
import UserRoutes from "./RoutesUser";

export default function Routes() {
  const { isAuthenticated, verifyJwt } = useAuth();

  useEffect(() => {
    !isAuthenticated && verifyJwt();
  }, [isAuthenticated, verifyJwt]);

  return (
    <IonReactRouter>
      {isAuthenticated ? <AdminRoutes /> : <UserRoutes />}
    </IonReactRouter>
  );
}
