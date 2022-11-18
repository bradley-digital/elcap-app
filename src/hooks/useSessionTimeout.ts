import { useCallback, useEffect } from "react";
import cookies from "lib/cookies";
import jwt_decode from "jwt-decode";

// hooks
import useAuth from "hooks/useAuth";

const useSessionTimeout = () => {
  const { logout, refreshAccessToken } = useAuth();

  const refreshTokenOrLogOut = useCallback(
    (lastMovementTime: Date) => {
      const authToken = cookies.get("jwt-cookie");
      const decodedAuthToken: any = authToken?.length && jwt_decode(authToken);
      const currentTime: Date = new Date();
      const timeThreeMinutesAgo: Date = new Date(
        currentTime.getTime() - 3 * 60 * 1000
      );
      const expirationWindowStart: Date = new Date(
        decodedAuthToken?.exp * 1000 - 3000
      );
      const isTokenAboutToExpire: boolean = expirationWindowStart < currentTime;
      const isUserInMovementWindow = lastMovementTime >= timeThreeMinutesAgo;

      function handleLogout() {
        async function asyncLogout() {
          await logout();
        }
        asyncLogout();
      }

      if (authToken?.length && isTokenAboutToExpire) {
        isUserInMovementWindow ? refreshAccessToken() : handleLogout();
      }
    },
    [refreshAccessToken, logout]
  );

  useEffect(() => {
    let lastMovementTime = new Date();

    const updateLastMovement = () => {
      lastMovementTime = new Date();
    };
    window.addEventListener("click", updateLastMovement);
    window.addEventListener("scroll", updateLastMovement);
    window.addEventListener("mousemove", updateLastMovement);
    window.addEventListener("keypress", updateLastMovement);

    const checker = () => refreshTokenOrLogOut(lastMovementTime);

    const intervalId = window.setInterval(checker, 1000);

    return () => {
      window.removeEventListener("click", updateLastMovement);
      window.removeEventListener("onscroll", updateLastMovement);
      window.removeEventListener("mousemove", updateLastMovement);
      window.removeEventListener("onkeypress", updateLastMovement);
      window.clearInterval(intervalId);
    };
  }, [refreshTokenOrLogOut]);
};

export default useSessionTimeout;
