// components
import { IonApp, setupIonicReact } from "@ionic/react";
import { AuthProvider } from "contexts/AuthContext";
import Routes from "components/Routes/Routes";

// theme variables
import "theme/global.scss";
import "theme/variables.scss";
import "theme/utilities.scss";

setupIonicReact();

export default function App() {
  return (
    <AuthProvider>
      <IonApp>
        <Routes />
      </IonApp>
    </AuthProvider>
  );
}
