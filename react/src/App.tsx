// components
import { IonApp, setupIonicReact } from "@ionic/react";
import { AuthProvider } from "contexts/AuthContext";
import Routes from "components/Routes/Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

// theme variables
import "theme/global.scss";
import "theme/variables.scss";
import "theme/utilities.scss";

setupIonicReact();

export default function App() {
  return (
    <GoogleOAuthProvider clientId="848820691795-t036afc4bjh1n2s6e77nfbvroj2cviso.apps.googleusercontent.com">
      <AuthProvider>
        <IonApp>
          <Routes />
        </IonApp>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
