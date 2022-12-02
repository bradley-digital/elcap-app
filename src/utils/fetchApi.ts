const host = process.env.REACT_APP_BACKEND_HOST || "";

type fetchApiProps = {
  url: string;
  method: string;
  email?: string;
  resetToken?: string;
  password?: string;
};

export const fetchApi = async ({
  url,
  method,
  email,
  resetToken,
  password,
}: fetchApiProps) => {
  const validatedBody = resetToken ? { resetToken, password } : { email };

  const res = await fetch(`${host}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedBody),
  });

  const body = await res.json();

  if (res.status === 200) {
    return body;
  }

  if (body.status === "fail") {
    throw new Error(body.message);
  }

  throw new Error(`Error with request to ${url}`);
};
