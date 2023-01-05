import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import useFacebookSdk from "hooks/useFacebookSdk";

type FacebookOAuthContextProps = {
  appId: string;
  scriptInitialized: boolean;
};

type FacebookOAuthProviderProps = {
  appId: string;
  children: ReactNode;
};

export const FacebookOAuthContext = createContext<FacebookOAuthContextProps>(
  null!
);

export function FacebookOAuthProvider({
  appId,
  children,
}: FacebookOAuthProviderProps) {
  const scriptLoaded = useFacebookSdk();
  const [scriptInitialized, setScriptInitialized] = useState(false);

  useEffect(() => {
    if (!scriptLoaded) return;

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: "v15.0",
      });
      setScriptInitialized(true);
    };
  }, [appId, scriptLoaded]);

  return (
    <FacebookOAuthContext.Provider value={{ appId, scriptInitialized }}>
      {children}
    </FacebookOAuthContext.Provider>
  );
}
