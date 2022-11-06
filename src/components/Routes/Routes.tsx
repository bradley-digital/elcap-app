import { IonReactRouter } from "@ionic/react-router";

// hooks
import useAuth from "hooks/useAuth";

// components
import AdminRoutes from "./RoutesAdmin";
import UserRoutes from "./RoutesUser";

export default function Routes() {
  const { isAuthenticated } = useAuth();

  return (
    <IonReactRouter>
      {isAuthenticated ? <AdminRoutes /> : <UserRoutes />}
    </IonReactRouter>
  );
}
