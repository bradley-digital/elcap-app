import type { ReactNode } from "react";
import { createContext, useState } from "react";

const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3030";

type Json = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
};

type AuthProviderProps = {
  children: ReactNode;
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

  async function handleAuthPost(
    endpoint: string,
    args: RegisterArgs | LoginArgs
  ) {
    try {
      const res = await fetch(`${host}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });

      if (res.status !== 200) {
        throw new Error(`Failed POST to: ${endpoint}`);
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await res.json();

      if (newAccessToken && newRefreshToken) {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setIsAuthenticated(true);
      } else {
        throw new Error("Access tokens not provided");
      }
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
      await handleAuthPost("/auth/register", {
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
      await handleAuthPost("/auth/login", {
        email,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function logout(): Promise<void> {
    try {
      const res = await fetch(`${host}/auth/revoke-refresh-tokens`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
      const res = await fetch(`${host}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (res.status !== 200) {
        return false;
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await res.json();

      if (newAccessToken && newRefreshToken) {
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error("Access tokens not provided");
      }
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

      const finalOptions = Object.assign(
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
        options
      );

      const res = await fetch(`${host}${endpoint}`, finalOptions);

      if (res.status === 200) {
        const json = res.json();
        return json;
      }

      if (res.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const json = await authFetch(endpoint, options);
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
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
