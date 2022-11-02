import {
  randEmail,
  randFirstName,
  randLastName,
  randPassword,
  randAddress,
  randPhoneNumber,
  randAvatar,
} from "@ngneat/falso";

const emailOptions = {
  provider: "elcapitan",
  nameSeparator: "none",
  suffix: "com",
};

const FRONTEND_PORT = process.env.REACT_APP_FRONTEND_PORT || 3021;
const FRONTEND_CONTAINER = process.env.REACT_APP_FRONTEND_HOST || "elcap_react";
export const url = `http://${FRONTEND_CONTAINER}:${FRONTEND_PORT}`;

export const user = {
  // @ts-ignore
  email: randEmail(emailOptions),
  firstName: randFirstName(),
  lastName: randLastName(),
  password: randPassword(),
  address: randAddress(),
  phone: randPhoneNumber(),
  avatar: randAvatar(),
};

export const config = {
  pathScrenshots: "./e2e/screenshots",
  url: url,
};

const getDeviceHeight = async (page: any) => {
  return await page.evaluate(async () => {
    const navigation = 56;
    // @ts-ignore
    const ionpage =
      document.querySelector(".ion-content--bottom")?.scrollHeight || 800;
    return ionpage + navigation;
  });
};

export const screenshot = async (page: any, path = "") => {
  const height = await getDeviceHeight(page);
  const urlName = page.url().replace(/\//g, "_");
  const pathname = path.length > 0 ? `${urlName}_${path}` : urlName;
  await page.setViewportSize({ width: 414, height });

  return page.screenshot({
    quality: 80,
    path: `${config.pathScrenshots}/${pathname}.jpg`,
    fullPage: true,
  });
};
