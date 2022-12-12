// hooks
import useAuth from "hooks/useAuth";

// Keeping all fetches in one file for now
// May need to break this out as:
// - useUser
// - useTransations
// - useCircle
// ...
export default function useApi() {
  const { authApi } = useAuth();

  async function getAccount() {
    const { data } = await authApi.get("/users/account");
    return data;
  }

  return {
    getAccount,
  };
}
