// components
import { IonApp, setupIonicReact } from "@ionic/react";
import { AuthProvider } from "contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "components/Routes/Routes";

// theme variables
import "theme/global.scss";
import "theme/variables.scss";
import "theme/utilities.scss";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
const queryClient = new QueryClient();

setupIonicReact();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <IonApp>
            <Routes />
          </IonApp>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
