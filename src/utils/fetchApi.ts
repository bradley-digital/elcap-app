const host = process.env.REACT_APP_BACKEND_HOST || "";

export const fetchApi = async (
  url: string,
  method: string,
  options: string[]
) => {
  const res = await fetch(`${host}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...options }),
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
