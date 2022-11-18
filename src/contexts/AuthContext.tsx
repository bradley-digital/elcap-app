import type { ReactNode } from "react";
import { createContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import cookies from "lib/cookies";
import { waitForRef } from "lib/async";

const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3020";

type Json = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type GoogleLoginArgs = {
  code: string;
};

type RegisterArgs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterFunction = (args: RegisterArgs) => Promise<void>;
type LoginFunction = (args: LoginArgs) => Promise<void>;
type GoogleLoginFunction = () => void;
type LogoutFunction = () => Promise<void>;
type AuthFetchFunction = (endpoint: string) => Promise<object>;
type RefreshAccessToken = () => Promise<void>;

type AuthContextProps = {
  isAuthenticated: boolean;
  errorMessage: ReactNode | null;
  register: RegisterFunction;
  login: LoginFunction;
  googleLogin: GoogleLoginFunction;
  logout: LogoutFunction;
  authFetch: AuthFetchFunction;
  refreshAccessToken: RefreshAccessToken;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  errorMessage: null,
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  register: async function (arg: RegisterArgs) {
    return;
  },
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  login: async function (arg: LoginArgs) {
    return;
  },
  googleLogin: function () {
    return;
  },
  logout: async function () {
    return;
  },
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  authFetch: async function (endpoint: string) {
    return {};
  },
  refreshAccessToken: async function () {
    return;
  },
});

const defaultRefreshToken = cookies.get("ec_rt");

export function AuthProvider({ children }: AuthProviderProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["ec_rt"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ReactNode | null>(null);
  const accessTokenRef = useRef<string>("");
  const refreshTokenRef = useRef<undefined | string>(defaultRefreshToken);
  const isRefreshingRef = useRef<boolean>(false);

  useEffect(() => {
    async function refresh() {
      console.log("refresh", refreshTokenRef.current);
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
    console.log("handleSetTokens");
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      tokens;

    if (newAccessToken && newRefreshToken) {
      accessTokenRef.current = newAccessToken;
      refreshTokenRef.current = newRefreshToken;
      setIsAuthenticated(true);
      setCookie("ec_rt", newRefreshToken, {
        path: "/",
        sameSite: "strict",
      });
      setErrorMessage(null);
    } else {
      throw new Error("Access tokens not provided");
    }
  }

  function handleRemoveTokens(): void {
    console.log("handleRemoveTokens");
    accessTokenRef.current = "";
    refreshTokenRef.current = "";
    setIsAuthenticated(false);
    removeCookie("ec_rt", { path: "/" });
  }

  function handleFetch(
    endpoint: string,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    options: any = { headers: {} }
  ): Promise<Response> {
    console.log("handleFetch", endpoint);
    const finalHeaders = Object.assign(
      {
        "Content-Type": "application/json",
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
    args: RegisterArgs | LoginArgs | GoogleLoginArgs,
    newErrorMessage: ReactNode | null
  ): Promise<void> {
    console.log("handleAuthentication", endpoint);
    try {
      const res = await handleFetch(`${endpoint}`, {
        method: "POST",
        body: args,
      });

      if (res.status !== 200) {
        setErrorMessage(newErrorMessage);
        throw new Error(`Failed POST to: ${endpoint}`);
      }

      const tokens = await res.json();
      handleSetTokens(tokens);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRefreshAccessToken() {
    console.log("handleRefreshAccessToken");
    try {
      isRefreshingRef.current = true;
      const res = await handleFetch("/auth/refresh-token", {
        method: "POST",
        body: {
          refreshToken: refreshTokenRef.current,
        },
      });

      if (res.status !== 200) {
        handleRemoveTokens();
        throw new Error("Unauthorized");
      }

      console.log("handleRefreshAccessToken handleFetch done", isRefreshingRef);

      const tokens = await res.json();
      handleSetTokens(tokens);
      isRefreshingRef.current = false;
      console.log("handleRefreshAccessToken handleSetTokens done", isRefreshingRef);
    } catch (err) {
      console.error(err);
    }
  }

  async function refreshAccessToken(): Promise<void> {
    console.log("refreshAccessToken");
    try {
      if (isRefreshingRef.current) {
        await waitForRef({
          ref: isRefreshingRef,
          toEqual: false,
        });
      } else {
        await handleRefreshAccessToken();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function authFetch(
    endpoint: string,
    options: any = { headers: {} }
  ): Promise<Json> {
    try {
      console.log("authFetch", endpoint, isRefreshingRef);

      await waitForRef({
        ref: isRefreshingRef,
        toEqual: false,
      });

      if (
        accessTokenRef.current &&
        options.headers &&
        typeof options.headers["Authorization"] === "undefined"
      ) {
        options.headers["Authorization"] = `Bearer ${accessTokenRef.current}`;
      }

      const res = await handleFetch(endpoint, options);

      if (res.status === 200) {
        const json = res.json();
        return json;
      }

      if (res.status === 401) {
        await refreshAccessToken();
        const json = await handleFetch(endpoint, options);
        return json;
      }
    } catch (err) {
      console.error(err);
    }

    return {};
  }

  async function register({
    firstName,
    lastName,
    email,
    phone,
    password,
  }: RegisterArgs): Promise<void> {
    try {
      const registerErrorMessage = <p>Failed to register.</p>;
      await handleAuthentication(
        "/auth/register",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
        },
        registerErrorMessage
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function login({ email, password }: LoginArgs): Promise<void> {
    try {
      const loginErrorMessage = (
        <p>
          Please <Link to="/register">register</Link> before logging in.
        </p>
      );
      await handleAuthentication(
        "/auth/login",
        {
          email,
          password,
        },
        loginErrorMessage
      );
    } catch (err) {
      console.error(err);
    }
  }

  const googleLoginErrorMessage = (
    <p>
      Please <Link to="/register">register</Link> before using Google to login.
    </p>
  );
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await handleAuthentication(
        "/auth/google",
        {
          code,
        },
        googleLoginErrorMessage
      );
    },
    onError: () => {
      setErrorMessage(googleLoginErrorMessage);
    },
    flow: "auth-code",
  });

  async function logout(): Promise<void> {
    try {
      handleRemoveTokens();

      const res = await handleFetch("/auth/revoke-refresh-tokens", {
        method: "POST",
      });

      if (res.status !== 200) {
        throw new Error("Logout failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        errorMessage,
        register,
        login,
        googleLogin,
        logout,
        authFetch,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
