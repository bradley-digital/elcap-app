import type { ReactNode } from "react";
import { createContext, useEffect, useRef, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import EventEmitter from "events";
import cookies from "lib/cookies";

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

type UpdateArgs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
  error: boolean;
  register: RegisterFunction;
  login: LoginFunction;
  googleLogin: GoogleLoginFunction;
  logout: LogoutFunction;
  authFetch: AuthFetchFunction;
  refreshAccessToken: RefreshAccessToken;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  error: false,
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  register: async function (arg: RegisterArgs) {
    return;
  },
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  login: async function (arg: LoginArgs) {
    return;
  },
  update: async function (arg: UpdateArgs) {
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

const refreshTokenCookie = "ec_rt";
const defaultRefreshToken = cookies.get(refreshTokenCookie);
const authEvents = new EventEmitter();
const waitForRefresh = () => new Promise<void>(res => authEvents.once("refreshed", res));

export function AuthProvider({ children }: AuthProviderProps) {
  const [cookies, setCookie, removeCookie] = useCookies([refreshTokenCookie]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      tokens;

    if (newAccessToken && newRefreshToken) {
      accessTokenRef.current = newAccessToken;
      refreshTokenRef.current = newRefreshToken;
      setIsAuthenticated(true);
      setCookie(refreshTokenCookie, newRefreshToken, {
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
    removeCookie(refreshTokenCookie, { path: "/" });
  }

  function handleFetch(
    endpoint: string,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    options: any = { headers: {} }
  ): Promise<Response> {
    const finalHeaders = Object.assign(
      {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessTokenRef.current}`,
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
    args: RegisterArgs | LoginArgs | GoogleLoginArgs | UpdateArgs
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

  async function authFetch(
    endpoint: string,
    options: any = {}
  ): Promise<Json> {
    try {
      if (isRefreshingRef.current) {
        await waitForRefresh();
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
      await handleAuthentication("/auth/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function update({
    firstName,
    lastName,
    email,
    phone,
  }: UpdateArgs): Promise<void> {
    try {
      await handleAuthentication("/auth/updateAccount", {
        firstName,
        lastName,
        email,
        phone,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function login({ email, password }: LoginArgs): Promise<void> {
    try {
      await handleAuthentication("/auth/login", {
        email,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await handleAuthentication("/auth/google", {
        code,
      });
    },
    onError: () => {
      setError(true);
    },
    flow: "auth-code",
  });

  async function logout(): Promise<void> {
    try {
      // Logout is an authenticated route
      // so that userId can be derived from the accessToken
      await authFetch("/auth/logout", {
        method: "POST",
      });

      handleRemoveTokens();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        error,
        register,
        update,
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
