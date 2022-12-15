import { useContext } from "react";
import { FacebookOAuthContext } from "contexts/FacebookOAuthContext";

export default function useFacebookOAuth() {
  const context = useContext(FacebookOAuthContext);
  if (!context) {
    throw new Error(
      "Facebook OAuth components must be used within FacebookOAuthProvider"
    );
  }
  return context;
}
