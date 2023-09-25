const urlParams = new URLSearchParams(window.location.search);
const amount = urlParams.get("amount");
const externalAccount = urlParams.get("externalAccount");
const fromAccount = urlParams.get("fromAccount");
const memo = urlParams.get("memo");
const transferDate = urlParams.get("transferDate");
const type = urlParams.get("type");

const transfer = {
  amount,
  externalAccount,
  fromAccount,
  memo,
  transferDate,
  type,
};

if (!amount || !externalAccount || !fromAccount || !transferDate || !type) {
  console.log("missing required parameters");
  window.close();
  // window.location.href = "/login";
}

const host = "http://localhost:3020";

const accessToken = await new Promise((resolve, reject) => {
  try {
    fetch(`${host}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: sessionStorage.getItem("refreshToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data.accessToken);
      });
  } catch (error) {
    reject(error);
  }
});

try {
  fetch(`${host}/api/users/western-alliance/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(transfer),
  }).then((data) => {
    if (data.status === 200) {
      window.close();
      window.location.href = "/dashboard/overview";
    }
  });
} catch (error) {
  console.log({ error });
  window.close();
  window.location.href = "/dashboard/overview";
}
