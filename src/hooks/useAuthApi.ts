import type { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EventEmitter from "events";

// hooks
import useTokens from "hooks/useTokens";

type APIError = {
  status: string;
  message: string;
}

export type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

type GoogleLoginBody = {
  code: string;
};

const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3020";

const config = {
  baseURL: host,
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
    authApi.interceptors.request.use(
      requestInterceptor,
      err => Promise.reject(err)
    );

    authApi.interceptors.response.use(
      response => response,
      responseErrorInterceptor
    );

    async function refresh() {
      if (refreshTokenRef.current === "") {
        setIsAuthenticated(false);
      } else {
        await refreshAccessToken();
      }
    }
    refresh();
    // Only run on load
    /* eslint-disable-next-line */
  }, []);

  async function requestInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    await waitForRefresh();
    if (config.headers && accessTokenRef.current) {
      config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
    }
    return config;
  }

  async function responseErrorInterceptor(error: AxiosError): Promise<any> {
    const originalRequest = error.config;

    if (typeof originalRequest === "undefined") {
      throw new Error("No request config defined");
    }

    const errorStatus = error.response?.status;
    const errorData = error.response?.data as APIError;

    if (errorStatus === 401) {
      await waitForRefresh();
      await refreshAccessToken();
      return authApi(originalRequest)
    }

    handleRemoveTokens();
    finishRefresh();

    if (errorData?.status === "fail") {
      throw new Error(errorData.message);
    }

    throw new Error(`Error with request to ${originalRequest.url}`);
  }

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

  async function handleAuthentication(
    url: string,
    body: RegisterBody | LoginBody | GoogleLoginBody
  ): Promise<void> {
    const { data } = await authApi.post(url, body);
    handleSetTokens(data);
  }

  return {
    authApi,
    isAuthenticated,
    role,
    refreshAccessToken,
    handleAuthentication,
    handleRemoveTokens,
  };
}
