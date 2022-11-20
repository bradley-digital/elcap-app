import { useCallback, useEffect } from "react";
import cookies from "lib/cookies";
import jwtDecode from "jwt-decode";

// hooks
import useAuth from "hooks/useAuth";

const useSessionTimeout = () => {
  const { logout, refreshAccessToken } = useAuth();

  const refreshTokenOrLogOut = useCallback(
    (lastMovementTime: number) => {
      const refreshToken = cookies.get("ec_rt");
      const refreshTokenExists = Boolean(refreshToken?.length);

      if (!refreshTokenExists) return;

      const decodedRefreshToken: any = jwtDecode(refreshToken);
      const currentTime = Date.now();
      const threeMinutesAgo = currentTime - 3 * 60 * 1000;
      const expirationWindowStart = decodedRefreshToken?.exp * 1000 - 3000
      const isTokenAboutToExpire = expirationWindowStart < currentTime;
      const isUserInMovementWindow = lastMovementTime >= threeMinutesAgo;

      if (isTokenAboutToExpire) {
        isUserInMovementWindow ? refreshAccessToken() : logout();
      }
    },
    [refreshAccessToken, logout]
  );

  useEffect(() => {
    let lastMovementTime = Date.now();

    const updateLastMovement = () => {
      lastMovementTime = Date.now();
    };

    window.addEventListener("click", updateLastMovement);
    window.addEventListener("scroll", updateLastMovement);
    window.addEventListener("keypress", updateLastMovement);

    const checker = () => refreshTokenOrLogOut(lastMovementTime);

    const intervalId = window.setInterval(checker, 1000);

    return () => {
      window.removeEventListener("click", updateLastMovement);
      window.removeEventListener("onscroll", updateLastMovement);
      window.removeEventListener("onkeypress", updateLastMovement);
      window.clearInterval(intervalId);
    };
  }, [refreshTokenOrLogOut]);
};

export default useSessionTimeout;
