// components
import { IonReactRouter } from "@ionic/react-router";
import AuthRouter from "./AuthRouter";

export default function Routes() {
  return (
    <IonReactRouter>
      <AuthRouter />
    </IonReactRouter>
  );
}
