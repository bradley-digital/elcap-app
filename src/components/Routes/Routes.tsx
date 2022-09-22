import { IonReactRouter } from "@ionic/react-router";
import { useCookies } from "react-cookie";

// components
import AdminRoutes from "./RoutesAdmin";
import UserRoutes from "./RoutesUser";

export default function Routes() {
  const [cookies] = useCookies(["user"]);

  return (
    <IonReactRouter>
      {cookies.user === "admin" ? <AdminRoutes /> : <UserRoutes />}
    </IonReactRouter>
  );
}
