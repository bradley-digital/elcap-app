const host = process.env.REACT_APP_BACKEND_HOST || "";

const updatePassword = async (resetToken: string, password: string) => {
  const res = await fetch(`${host}/users/reset-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resetToken, password }),
  });

  const body = await res.json();

  if (res.status === 200) {
    return body;
  }

  if (body.status === "fail") {
    throw new Error(body.message);
  }

  throw new Error("Error updating password");
};

export default updatePassword;
