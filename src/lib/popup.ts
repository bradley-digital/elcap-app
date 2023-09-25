export async function createPopup(
  url: string,
  closeOn: string,
  transferBody: any,
) {
  return new Promise<string>((resolve, reject) => {
    try {
      const popup = window.open(url, "popup", "popup=true");

      const checkPopup = setInterval(() => {
        if (popup?.window?.location?.href?.includes(closeOn)) {
          if (popup.window.location.href.includes("?event=signing_complete")) {
            const {
              amount,
              externalAccount,
              fromAccount,
              memo,
              transferDate,
              type,
            } = transferBody;

            const uri = encodeURI(
              `/transfer/index.html?amount=${amount}&externalAccount=${externalAccount}&fromAccount=${fromAccount}&memo=${memo}&transferDate=${transferDate}&type=${type}`,
            );
            window.location.href = uri;
            resolve(uri);
            clearInterval(checkPopup);
          } else {
            popup.close();
            resolve("closed");
            clearInterval(checkPopup);
          }
        }
        if (!popup || popup.closed) {
          resolve("closed");
          clearInterval(checkPopup);
        }
      }, 250);
    } catch (err) {
      reject(err);
    }
  });
}
