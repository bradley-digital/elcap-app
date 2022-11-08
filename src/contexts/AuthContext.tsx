import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";

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

type AuthContextProps = {
  isAuthenticated: boolean;
  errorMessage: ReactNode | null;
  register: RegisterFunction;
  login: LoginFunction;
  googleLogin: GoogleLoginFunction;
  logout: LogoutFunction;
  authFetch: AuthFetchFunction;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: true,
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
});

function getCookie(name: string): string {
  name = name + '=';
  var value = '';
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    cookie = cookie.trim();
    if (cookie.includes(name)) {
      value = cookie.substring(name.length, cookie.length);
      break;
    }
  }
  return value;
}

const defaultRefreshToken = getCookie('jwt-cookie');

export function AuthProvider({ children }: AuthProviderProps) {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-cookie"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<ReactNode | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>(defaultRefreshToken);

  useEffect(() => {
    async function refresh() {
      const refreshToken = cookies["jwt-cookie"];
      if (refreshToken) {
        setRefreshToken(refreshToken);
        await refreshAccessToken(refreshToken);
      } else {
        setIsAuthenticated(false);
      }
    }
    refresh();
  }, []);

  function handleSetTokens(tokens: TokenResponse): void {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      tokens;

    if (newAccessToken && newRefreshToken) {
      setCookie("jwt-cookie", newRefreshToken, {
        path: "/",
        sameSite: "strict"
      });
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setIsAuthenticated(true);
      setErrorMessage(null);
    } else {
      throw new Error("Access tokens not provided");
    }
  }

  function handleFetch(
    endpoint: string,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    options: any = { headers: {} }
  ): Promise<Response> {
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

  async function register({
    firstName,
    lastName,
    email,
    phone,
    password,
  }: RegisterArgs): Promise<void> {
    try {
      const registerErrorMessage = <p>Failed to register.</p>;
      await handleAuthentication("/auth/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
      }, registerErrorMessage);
    } catch (err) {
      console.error(err);
    }
  }

  async function login({ email, password }: LoginArgs): Promise<void> {
    try {
      const loginErrorMessage = <p>Please <Link to="/register">register</Link> before logging in.</p>;
      await handleAuthentication("/auth/login", {
        email,
        password,
      }, loginErrorMessage);
    } catch (err) {
      console.error(err);
    }
  }

  const googleLoginErrorMessage = <p>Please <Link to="/register">register</Link> before using Google to login.</p>;
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await handleAuthentication("/auth/google", {
        code,
      }, googleLoginErrorMessage);
    },
    onError: () => {
      setErrorMessage(googleLoginErrorMessage);
    },
    flow: "auth-code",
  });

  async function logout(): Promise<void> {
    try {
      removeCookie("jwt-cookie", { path: "/" });
      setAccessToken("");
      setRefreshToken("");
      setIsAuthenticated(false);

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

  async function refreshAccessToken(refreshTokenArg?: string): Promise<void> {
    try {
      let finalRefreshToken = refreshToken;

      if (typeof refreshTokenArg === "string") {
        finalRefreshToken = refreshTokenArg;
      }

      const res = await handleFetch("/auth/refresh-token", {
        method: "POST",
        body: {
          refreshToken: finalRefreshToken,
        },
      });

      if (res.status !== 200) {
        throw new Error("Unauthorized");
      }

      const tokens = await res.json();
      handleSetTokens(tokens);
    } catch (err) {
      console.error(err);
    }
  }

  async function authFetch(
    endpoint: string,
    options: any = { headers: {} }
  ): Promise<Json> {
    try {
      if (accessToken && options.headers && typeof options.headers["Authorization"] === "undefined") {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
