import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect, useRef } from "react";
import axios from "axios";
import EventEmitter from "events";

// hooks
import useTokens from "hooks/useTokens";

type APIError = {
  status: string;
  message: string;
};

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:3020";
const apiVersion = "/api";

const config = {
  baseURL: `${host}${apiVersion}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(config);
const authApi = axios.create(config);

const authEvents = new EventEmitter();
const onceRefreshed = () =>
  new Promise<void>((res) => authEvents.once("refreshed", res));

export default function useAuthApi() {
  const {
    role,
    accessTokenRef,
    refreshTokenRef,
    isAuthenticated,
    setIsAuthenticated,
    handleSetTokens,
    handleRemoveTokens,
  } = useTokens();
  const isRefreshingRef = useRef<boolean>(false);

  useEffect(() => {
    async function refresh() {
      if (refreshTokenRef.current === "") {
        setIsAuthenticated(false);
      } else {
        await refreshAccessToken();
      }
    }
    refresh();

    const registeredRequestInterceptor = authApi.interceptors.request.use(
      requestInterceptor,
      (err) => Promise.reject(err)
    );

    const registeredResponseInterceptor = authApi.interceptors.response.use(
      (response) => response,
      responseErrorInterceptor
    );

    return () => {
      authApi.interceptors.request.eject(registeredRequestInterceptor);
      authApi.interceptors.response.eject(registeredResponseInterceptor);
    };

    // Only run on load
    /* eslint-disable-next-line */
  }, []);

  function startRefresh(): void {
    isRefreshingRef.current = true;
  }

  function finishRefresh(): void {
    isRefreshingRef.current = false;
    authEvents.emit("refreshed");
  }

  async function waitForRefresh(): Promise<void> {
    if (isRefreshingRef.current) {
      await onceRefreshed();
    }
  }

  async function refreshAccessToken(): Promise<void> {
    try {
      startRefresh();
      const { data } = await api.post("/auth/refresh-token", {
        refreshToken: refreshTokenRef.current,
      });
      handleSetTokens(data);
    } finally {
      finishRefresh();
    }
  }

  async function requestInterceptor(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    await waitForRefresh();
    if (config.headers && accessTokenRef.current) {
      config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
    }
    return config;
  }

  async function responseErrorInterceptor(
    error: AxiosError
  ): Promise<AxiosResponse> {
    const originalRequest = error.config;
    const errorStatus = error.response?.status;
    const errorData = error.response?.data as APIError;

    if (typeof originalRequest === "undefined") {
      throw new Error("Original request undefined");
    }

    if (errorStatus === 401) {
      await waitForRefresh();
      await refreshAccessToken();
      return authApi(originalRequest);
    }

    // Removing refresh tokens logs the user out on any error...
    // Did not work for intended errors, such as no Docfox application found
    // Either need to rework intended errors, or keep this uncommented
    //handleRemoveTokens();
    finishRefresh();

    if (errorData?.status === "fail") {
      throw new Error(errorData.message);
    }

    throw new Error(`Error with request to ${originalRequest.url}`);
  }

  return {
    role,
    isAuthenticated,
    authApi,
    refreshAccessToken,
    handleSetTokens,
    handleRemoveTokens,
  };
}
