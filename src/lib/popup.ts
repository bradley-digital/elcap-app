export async function createPopup(url: string, closeOn: string) {
  return new Promise<string>((resolve, reject) => {
    try {
      const popup = window.open(url, "popup", "popup=true");

      const checkPopup = setInterval(() => {
        if (popup?.window?.location?.href?.includes(closeOn)) {
          popup.close();
          resolve(popup.window.location.href);
          clearInterval(checkPopup);
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
