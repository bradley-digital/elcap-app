import { useEffect, useState } from "react";

export default function useFacebookSdk() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const id = "facebook-jssdk";
    if (document.getElementById(id)) return;
    const firstScript = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");
    script.id = id;
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptLoaded(false);

    firstScript?.parentNode?.insertBefore(script, firstScript);

    return () => {
      firstScript?.parentNode?.removeChild(script);
    };
  }, []);

  return scriptLoaded;
}
