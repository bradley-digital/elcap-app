import type { AxiosInstance } from "axios";
import type { ReactNode } from "react";
import { createContext, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useFacebookLogin from "hooks/useFacebookLogin";

// lib
import getErrorMessage from "lib/error";

// hooks
import useAuthApi from "hooks/useAuthApi";
import { useIonToast } from "@ionic/react";
import { socket } from "lib/socket";

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type FacebookLoginBody = {
  accessToken: string;
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
  otp: string;
};

type SetPasswordBody = {
  registerToken: string;
  password: string;
  otp: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type RefreshAccessToken = () => Promise<void>;
type Register = (body: RegisterBody) => Promise<void>;
type Login = (body: LoginBody) => Promise<void>;
type GoogleLogin = () => void;
type FacebookLogin = () => void;
type ForgotPassword = (body: ForgotPasswordBody) => Promise<void>;
type ResetPassword = (body: ResetPasswordBody) => Promise<void>;
type SetPassword = (body: SetPasswordBody) => Promise<void>;
type Logout = () => Promise<void>;

type AuthContextProps = {
  role: string;
  isAuthenticated: boolean;
  authApi: AxiosInstance;
  refreshAccessToken: RefreshAccessToken;
  register: Register;
  login: Login;
  googleLogin: GoogleLogin;
  facebookLogin: FacebookLogin;
  forgotPassword: ForgotPassword;
  setPassword: SetPassword;
  resetPassword: ResetPassword;
  logout: Logout;
};

export const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    role,
    isAuthenticated,
    authApi,
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
    body: SetPasswordBody | LoginBody | GoogleLoginBody | FacebookLoginBody,
  ): Promise<void> {
    try {
      const res = await authApi.post(url, body);
      handleSetTokens(res.data);
    } catch (error) {
      handleError(error);
    }
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

  const facebookLogin = useFacebookLogin({
    onSuccess: async ({ accessToken }) => {
      await handleAuthentication("/auth/facebook", {
        accessToken,
      });
    },
    onError: handleError,
  });

  async function register(body: RegisterBody): Promise<void> {
    try {
      const res = await authApi.post("/auth/register", body);
      handleSuccess(res.data.message);
    } catch (error) {
      handleError(error);
    }
  }

  async function setPassword(body: SetPasswordBody): Promise<void> {
    try {
      await handleAuthentication("/auth/set-password", body);
    } catch (error) {
      handleError(error);
    }
  }

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
      await authApi.post("/auth/logout");
    } finally {
      handleRemoveTokens();
    }
  }

  useEffect(() => {
    const listener = async () => {
      await logout();
    };
    const accountNsp = socket("/account");
    accountNsp.on("account:disabled", listener);
    return () => {
      accountNsp.disconnect();
    };
  }, []);

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
        facebookLogin,
        forgotPassword,
        setPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
