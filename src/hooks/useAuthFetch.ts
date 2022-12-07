import { useEffect, useRef, useState } from "react";
import EventEmitter from "events";
//import axios from "axios";

// lib
import cookies from "lib/cookies";

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  role: string;
};

export type RegisterArgs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginArgs = {
  email: string;
  password: string;
};

type GoogleLoginArgs = {
  code: string;
};

const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3020";
const refreshTokenCookie = "ec_rt";
const defaultRefreshToken = cookies.get(refreshTokenCookie);
const authEvents = new EventEmitter();
const waitForRefresh = () =>
  new Promise<void>((res) => authEvents.once("refreshed", res));

export default function useAuthFetch() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const accessTokenRef = useRef<string>("");
  const refreshTokenRef = useRef<undefined | string>(defaultRefreshToken);
  const isRefreshingRef = useRef<boolean>(false);

  useEffect(() => {
    async function refresh() {
      if (typeof refreshTokenRef.current === "undefined") {
        setIsAuthenticated(false);
      } else {
        await refreshAccessToken();
      }
    }
    refresh();
    // Only run on load
    /* eslint-disable-next-line */
  }, []);

  function handleSetTokens(tokens: TokenResponse): void {
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      role: newRole,
    } = tokens;

    if (newAccessToken && newRefreshToken && newRole) {
      accessTokenRef.current = newAccessToken;
      refreshTokenRef.current = newRefreshToken;
      setIsAuthenticated(true);
      setRole(newRole);
      cookies.set(refreshTokenCookie, newRefreshToken, {
        path: "/",
        sameSite: "strict",
      });
      setError(false);
    } else {
      throw new Error("Access tokens not provided");
    }
  }

  function handleRemoveTokens(): void {
    accessTokenRef.current = "";
    refreshTokenRef.current = "";
    setIsAuthenticated(false);
    cookies.remove(refreshTokenCookie, { path: "/" });
  }

  function handleFetch(
    endpoint: string,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    options: any = { headers: {} }
  ): Promise<Response> {
    const finalHeaders = Object.assign(
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessTokenRef.current}`,
      },
      options.headers
    );
    delete options.headers;

    if (options.body && typeof options.body !== "string") {
      options.body = JSON.stringify(options.body);
    }

    const finalOptions = Object.assign(
      {
        method: "GET",
        credentials: "include",
        headers: finalHeaders,
      },
      options
    );

    return fetch(`${host}${endpoint}`, finalOptions);
  }

  async function handleAuthentication(
    endpoint: string,
    args: RegisterArgs | LoginArgs | GoogleLoginArgs
  ): Promise<void> {
    try {
      const res = await handleFetch(`${endpoint}`, {
        method: "POST",
        body: args,
      });

      if (res.status !== 200) {
        setError(true);
        throw new Error(`Failed POST to: ${endpoint}`);
      }

      const tokens = await res.json();
      handleSetTokens(tokens);
    } catch (err) {
      console.error(err);
    }
  }

  async function refreshAccessToken(): Promise<void> {
    try {
      if (isRefreshingRef.current) {
        await waitForRefresh();
      } else {

        isRefreshingRef.current = true;

        const res = await handleFetch("/auth/refresh-token", {
          method: "POST",
          body: {
            refreshToken: refreshTokenRef.current,
          },
        });

        if (res.status !== 200) {
          handleRemoveTokens();
          isRefreshingRef.current = false;
          authEvents.emit("refreshed");
          throw new Error("Unauthorized");
        }

        const tokens = await res.json();
        handleSetTokens(tokens);

        isRefreshingRef.current = false;
        authEvents.emit("refreshed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchJson(endpoint: string, options: any = {}): Promise<any> {
    const res = await handleFetch(endpoint, options);
    const json = await res.json();

    if (res.status !== 200) {
      setError(true);

      if (json.status === "fail") {
        throw new Error(json.message);
      }

      throw new Error(`Error with request to ${endpoint}`);
    }

    return json;
  }

  async function authFetch(endpoint: string, options: any = {}): Promise<any> {
    try {
      if (isRefreshingRef.current) {
        await waitForRefresh();
      }

      const res = await handleFetch(endpoint, options);

      if (res.status === 200) {
        const json = await res.json();
        return json;
      } else {
        await refreshAccessToken();
        const json = await handleFetch(endpoint, options);
        return json;
      }
    } catch (err) {
      console.error(err);
    }

    return {};
  }

  return {
    isAuthenticated,
    role,
    error,
    setError,
    handleAuthentication,
    handleRemoveTokens,
    authFetch,
    fetchJson,
    refreshAccessToken,
  };
}
