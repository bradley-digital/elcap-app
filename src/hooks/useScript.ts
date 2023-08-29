import { useEffect, useState } from "react";

export default function useScript(scriptSrc: string) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const id = scriptSrc.replace(/[\W]/g, "");

  useEffect(() => {
    if (document.getElementById(id)) return;
    const firstScript = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");
    script.id = id;
    script.src = scriptSrc;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptLoaded(false);

    firstScript?.parentNode?.insertBefore(script, firstScript);

    return () => {
      firstScript?.parentNode?.removeChild(script);
    };
  }, []);

  return {
    id,
    scriptLoaded,
  };
}
