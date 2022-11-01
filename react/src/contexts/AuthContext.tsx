import type { ReactNode } from "react";
import { createContext, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3030";

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

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterArgs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

// There has to be a better way to do this,
// this is bad TypeScript
export const AuthContext = createContext({
  isAuthenticated: false,
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

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

    if (accessToken && typeof finalHeaders["Authorization"] === "undefined") {
      finalHeaders["Authorization"] = `Bearer ${accessToken}`;
    }

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

  function handleSetTokens(tokens: TokenResponse) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      tokens;

    if (newAccessToken && newRefreshToken) {
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setIsAuthenticated(true);
    } else {
      throw new Error("Access tokens not provided");
    }
  }

  async function handleAuthentication(
    endpoint: string,
    args: RegisterArgs | LoginArgs | GoogleLoginArgs
  ) {
    try {
      const res = await handleFetch(`${endpoint}`, {
        method: "POST",
        body: args,
      });

      if (res.status !== 200) {
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
    flow: "auth-code",
  });

  async function logout(): Promise<void> {
    try {
      const res = await handleFetch("/auth/revoke-refresh-tokens", {
        method: "POST",
      });

      if (res.status !== 200) {
        throw new Error("Logout failed");
      }

      setAccessToken("");
      setRefreshToken("");
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function refreshAccessToken(): Promise<boolean> {
    try {
      const res = await handleFetch("/auth/refresh-token", {
        method: "POST",
        body: {
          refreshToken,
        },
      });

      if (res.status !== 200) {
        return false;
      }

      const tokens = await res.json();
      handleSetTokens(tokens);
      return true;
    } catch (err) {
      console.error(err);
    }

    return false;
  }

  async function authFetch(endpoint: string, options?: any): Promise<Json> {
    try {
      if (!isAuthenticated || !accessToken) {
        throw new Error("Unauthorized");
      }

      const res = await handleFetch(endpoint, options);

      if (res.status === 200) {
        const json = res.json();
        return json;
      }

      if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const json = await handleFetch(endpoint, options);
          return json;
        }
      }

      throw new Error("Unauthorized");
    } catch (err) {
      console.error(err);
    }

    return {};
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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
