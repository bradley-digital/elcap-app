import { useContext } from "react";
import { IonReactRouter } from "@ionic/react-router";

// contexts
import { AuthContext } from "contexts/AuthContext";

// components
import AdminRoutes from "./RoutesAdmin";
import UserRoutes from "./RoutesUser";

export default function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <IonReactRouter>
      {isAuthenticated ? <AdminRoutes /> : <UserRoutes />}
    </IonReactRouter>
  );
}
