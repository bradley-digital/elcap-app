import type { AxiosInstance } from "axios";
import type { ReactNode } from "react";
import { createContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

// lib
import getErrorMessage from "lib/error";

// hooks
import useAuthApi from "hooks/useAuthApi";
import { useIonToast } from "@ionic/react";

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type GoogleLoginBody = {
  code: string;
};

type ForgotPasswordBody = {
  email: string;
};

type ResetPasswordBody = {
  resetToken: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type Register = (body: RegisterBody) => Promise<void>;
type Login = (body: LoginBody) => Promise<void>;
type GoogleLogin = () => void;
type ForgotPassword = (body: ForgotPasswordBody) => Promise<void>;
type ResetPassword = (body: ResetPasswordBody) => Promise<void>;
type Logout = () => Promise<void>;
type RefreshAccessToken = () => Promise<void>;

type AuthContextProps = {
  isAuthenticated: boolean;
  role: string;
  authApi: AxiosInstance;
  refreshAccessToken: RefreshAccessToken;
  register: Register;
  login: Login;
  googleLogin: GoogleLogin;
  forgotPassword: ForgotPassword;
  resetPassword: ResetPassword;
  logout: Logout;
};

export const AuthContext = createContext<AuthContextProps>({
  role: "",
  isAuthenticated: false,
  authApi: axios,
  refreshAccessToken: async function () {
    return;
  },
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
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  forgotPassword: async function (body: ForgotPasswordBody) {
    return;
  },
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  resetPassword: async function (body: ResetPasswordBody) {
    return;
  },
  logout: async function () {
    return;
  },
});

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    authApi,
    role,
    isAuthenticated,
    refreshAccessToken,
    handleSetTokens,
    handleRemoveTokens,
  } = useAuthApi();
  const [showToast] = useIonToast();

  function handleSuccess(message: string) {
    showToast({
      message,
      duration: 8 * 1000,
      position: "bottom",
      color: "success",
    });
  }

  function handleError(error: unknown) {
    showToast({
      message: getErrorMessage(error),
      duration: 8 * 1000,
      position: "bottom",
      color: "danger",
    });
  }

  async function handleAuthentication(
    url: string,
    body: RegisterBody | LoginBody | GoogleLoginBody
  ): Promise<void> {
    try {
      const res = await authApi.post(url, body);
      handleSetTokens(res.data);
    } catch (error) {
      handleError(error);
    }
  }

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
    onError: handleError,
    flow: "auth-code",
  });

  async function resetPassword(body: ResetPasswordBody): Promise<void> {
    try {
      const res = await authApi.patch("/auth/reset-password", body);
      handleSuccess(res.data.message);
    } catch (error) {
      handleError(error);
    }
  }

  async function forgotPassword(body: ForgotPasswordBody): Promise<void> {
    try {
      const res = await authApi.post("/auth/forgot-password", body);
      handleSuccess(res.data.message);
    } catch (error) {
      handleError(error);
    }
  }

  async function logout(): Promise<void> {
    try {
      // Logout is an authenticated route because
      // userId is stored in the accesstoken
      await authApi.post("/auth/logout");
    } finally {
      handleRemoveTokens();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated,
        authApi,
        refreshAccessToken,
        register,
        login,
        googleLogin,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
