import useFacebookOAuth from "hooks/useFacebookOAuth";

type AuthResponse = {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  signedRequest: string;
  userID: string;
  grantedScopes?: string | undefined;
  reauthorize_required_in?: number | undefined;
};

type FacebookLogin = {
  onSuccess: (authResponse: AuthResponse) => void;
  onError: (message: string) => void;
};

export default function useFacebookLogin({
  onSuccess,
  onError,
}: FacebookLogin) {
  const { scriptInitialized } = useFacebookOAuth();

  const login = function () {
    if (!scriptInitialized) return;

    window.FB.login(
      function (response) {
        if (response.status === "connected") {
          onSuccess(response.authResponse);
        } else {
          onError("Failed to login with Facebook");
        }
      },
      { scope: "email" }
    );
  };

  return login;
}
