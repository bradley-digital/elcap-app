import { useRef, useState } from "react";

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  role: string;
  userId: string;
};

const refreshTokenName = "refreshToken";
const userIdName = "userId";

function setRefreshToken(token: string): void {
  sessionStorage.setItem(refreshTokenName, token);
}

function setUserId(userId: string): void {
  sessionStorage.setItem(userIdName, userId);
}

export function getRefreshToken(): string {
  const storedToken = sessionStorage.getItem(refreshTokenName);
  if (storedToken === null) return "";
  return storedToken;
}

export function getUserId(): string {
  const storedToken = sessionStorage.getItem(userIdName);
  if (storedToken === null) return "";
  return storedToken;
}

function removeRefreshToken(): void {
  sessionStorage.removeItem(refreshTokenName);
}

function removeUserId(): void {
  sessionStorage.removeItem(userIdName);
}

export default function useTokens() {
  const accessTokenRef = useRef<string>("");
  const refreshTokenRef = useRef<string>(getRefreshToken());
  const userIdRef = useRef<string>(getUserId());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  function handleSetTokens(tokens: TokenResponse): void {
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      role: newRole,
      userId,
    } = tokens;

    if (newAccessToken && newRefreshToken && newRole && userId) {
      setRole(newRole);
      setIsAuthenticated(true);
      accessTokenRef.current = newAccessToken;
      refreshTokenRef.current = newRefreshToken;
      setRefreshToken(newRefreshToken);
      userIdRef.current = userId;
      setUserId(userId);
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
    removeUserId();
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