import type { ReactNode } from "react";
import { createContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";

// hooks
import type { RegisterArgs, LoginArgs } from "hooks/useAuthFetch";
import useAuthFetch from "hooks/useAuthFetch";

type AuthProviderProps = {
  children: ReactNode;
};

type RegisterFunction = (args: RegisterArgs) => Promise<void>;
type LoginFunction = (args: LoginArgs) => Promise<void>;
type GoogleLoginFunction = () => void;
type LogoutFunction = () => Promise<void>;
type AuthFetchFunction = (endpoint: string, options?: any) => Promise<object>;
type RefreshAccessToken = () => Promise<void>;

type AuthContextProps = {
  isAuthenticated: boolean;
  role: string;
  error: boolean;
  authFetch: AuthFetchFunction;
  refreshAccessToken: RefreshAccessToken;
  register: RegisterFunction;
  login: LoginFunction;
  googleLogin: GoogleLoginFunction;
  logout: LogoutFunction;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  role: "",
  error: false,
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
  authFetch: async function (endpoint: string, options?: any) {
    return {};
  },
  refreshAccessToken: async function () {
    return;
  },
});

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    isAuthenticated,
    role,
    error,
    setError,
    authFetch,
    refreshAccessToken,
    handleAuthentication,
    handleRemoveTokens,
  } = useAuthFetch();

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
        role,
        error,
        authFetch,
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
