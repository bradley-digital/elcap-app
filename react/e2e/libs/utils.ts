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

// export const url = 'https://hub-app-dev.vercel.app';
export const url = "http://localhost:8100";

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

const getDeviceHeight = async (page) => {
  return await page.evaluate(async () => {
    const navigation = 56;
    // @ts-ignore
    const ionpage =
      document.querySelector(".ion-content--bottom")?.scrollHeight || 800;
    return ionpage + navigation;
  });
};

export const screenshot = async (page, path = "") => {
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
