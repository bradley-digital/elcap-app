import type { AxiosInstance } from "axios";
import type { ReactNode } from "react";
import { createContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

// hooks
import type { RegisterBody, LoginBody } from "hooks/useAuthApi";
import useAuthApi from "hooks/useAuthApi";

type AuthProviderProps = {
  children: ReactNode;
};

type RegisterFunction = (args: RegisterBody) => Promise<void>;
type LoginFunction = (args: LoginBody) => Promise<void>;
type GoogleLoginFunction = () => void;
type LogoutFunction = () => Promise<void>;
type RefreshAccessToken = () => Promise<void>;

type AuthContextProps = {
  isAuthenticated: boolean;
  role: string;
  authApi: AxiosInstance;
  refreshAccessToken: RefreshAccessToken;
  register: RegisterFunction;
  login: LoginFunction;
  googleLogin: GoogleLoginFunction;
  logout: LogoutFunction;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  role: "",
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  register: async function (body: RegisterBody) {
    return;
  },
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  login: async function (body: LoginBody) {
    return;
  },
  googleLogin: function () {
    return;
  },
  logout: async function () {
    return;
  },
  authApi: axios,
  refreshAccessToken: async function () {
    return;
  },
});

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    authApi,
    isAuthenticated,
    role,
    refreshAccessToken,
    handleAuthentication,
    handleRemoveTokens,
  } = useAuthApi();

  async function register(body: RegisterBody): Promise<void> {
    await handleAuthentication("/auth/register", body);
  }

  async function login(body: LoginBody): Promise<void> {
    await handleAuthentication("/auth/login", body);
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await handleAuthentication("/auth/google", {
        code,
      });
    },
    onError: (error) => {
      console.error(error);
    },
    flow: "auth-code",
  });

  async function logout(): Promise<void> {
    // Logout is an authenticated route
    // so that userId can be derived from the accessToken
    await authApi.post("/auth/logout");
    handleRemoveTokens();
  }

  return (
    <AuthContext.Provider
      value={{
        authApi,
        isAuthenticated,
        role,
        refreshAccessToken,
        register,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
