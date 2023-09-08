import { getRefreshToken } from "hooks/useTokens";
import { io } from "socket.io-client";
const URL = import.meta.env.VITE_BACKEND_HOST;
const token = getRefreshToken();

export const socket = (namespace = "/") =>
  io(URL + namespace, {
    extraHeaders: {
      authorization: `Bearer ${token || ""}`,
    },
  });
