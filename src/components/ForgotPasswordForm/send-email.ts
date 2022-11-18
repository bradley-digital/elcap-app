const host = process.env.REACT_APP_BACKEND_HOST || "";

const sendForgotPasswordEmail = async (email: string) => {
  const res = await fetch(`${host}/email/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const body = await res.json();

  if (res.status === 200) {
    return body;
  }

  if (body.status === "fail") {
    throw new Error(body.message);
  }

  throw new Error("Error sending email!");
};

export default sendForgotPasswordEmail;
