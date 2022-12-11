import { useRef, useState } from "react";

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  role: string;
};

const refreshTokenName = "refreshToken";

function setRefreshToken(token: string): void {
  sessionStorage.setItem(refreshTokenName, token);
}

export function getRefreshToken(): string {
  const storedToken = sessionStorage.getItem(refreshTokenName);
  if (storedToken === null) return "";
  return storedToken;
}

function removeRefreshToken(): void {
  sessionStorage.removeItem(refreshTokenName);
}

export default function useTokens() {
  const accessTokenRef = useRef<string>("");
  const refreshTokenRef = useRef<string>(getRefreshToken());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  function handleSetTokens(tokens: TokenResponse): void {
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      role: newRole,
    } = tokens;

    if (newAccessToken && newRefreshToken && newRole) {
      setRole(newRole);
      setIsAuthenticated(true);
      accessTokenRef.current = newAccessToken;
      refreshTokenRef.current = newRefreshToken;
      setRefreshToken(newRefreshToken);
    } else {
      throw new Error("Access tokens not provided");
    }
  }

  function handleRemoveTokens(): void {
    setRole("");
    setIsAuthenticated(false);
    accessTokenRef.current = "";
    refreshTokenRef.current = "";
    removeRefreshToken();
  }

  return {
    role,
    accessTokenRef,
    refreshTokenRef,
    isAuthenticated,
    setIsAuthenticated,
    handleSetTokens,
    handleRemoveTokens,
  };
}
