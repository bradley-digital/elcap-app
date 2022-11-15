import { IonReactRouter } from "@ionic/react-router";

// hooks
import useAuth from "hooks/useAuth";

// components
import AdminRoutes from "./RoutesAdmin";
import UserRoutes from "./RoutesUser";

// hooks
import useSessionTimeout from "hooks/useSessionTimeout";

export default function Routes() {
  const { isAuthenticated } = useAuth();

  useSessionTimeout();

  return (
    <IonReactRouter>
      {isAuthenticated ? <AdminRoutes /> : <UserRoutes />}
    </IonReactRouter>
  );
}
