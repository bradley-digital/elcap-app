import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";
import { Provider as JotaiProvider } from "jotai";

// components
import { IonApp, setupIonicReact } from "@ionic/react";
import { AuthProvider } from "contexts/AuthContext";
import { FacebookOAuthProvider } from "contexts/FacebookOAuthContext";
import Routes from "routes/Routes";

// theme variables
import "theme/global.scss";
import "theme/variables.scss";
import "theme/utilities.scss";

const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || "";
const facebookAppId = import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID || "";
const queryClient = new QueryClient();

setupIonicReact();

export default function App() {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <GoogleOAuthProvider clientId={googleClientId}>
            <FacebookOAuthProvider appId={facebookAppId}>
              <AuthProvider>
                <IonApp>
                  <Routes />
                </IonApp>
              </AuthProvider>
            </FacebookOAuthProvider>
          </GoogleOAuthProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
