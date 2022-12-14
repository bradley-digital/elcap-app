// hooks
import useAuth from "hooks/useAuth";

export type Profile = {
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  phone: string;
  email: string;
  address: string;
};

export type ProfileUpdateInput = {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
};

// Keeping all fetches in one file for now
// May need to break this out as:
// - useUser
// - useTransations
// - useCircle
// ...
export default function useApi() {
  const { authApi } = useAuth();

  async function getUser() {
    const { data } = await authApi.get<Profile>("/users/account");
    return data;
  }

  async function updateUser(body: ProfileUpdateInput) {
    const { data } = await authApi.post<Profile>("/users/update", body);
    return data;
  }

  return {
    getUser,
    updateUser,
  };
}
