import { wallet, qrCode, receipt } from "ionicons/icons";

// tempData
const chaseLogo = "/assets/chase.png";
const coinbaseLogo = "/assets/coinbase.png";

export const paymentMethods = [
  {
    img: chaseLogo,
    name: "Chase Bank",
    domain: "chase.com",
  },
  {
    img: coinbaseLogo,
    name: "Coinbase",
    domain: "coinbase.com",
  },
];

// tempData
type Transaction = {
  date: string;
  note: string;
  amount: string;
};

export const transactions: Transaction[] = [
  {
    date: "09/01/2022",
    note: "The Golden Leaf - Mimosa",
    amount: "$41.37",
  },
  {
    date: "09/01/2022",
    note: "The Golden Leaf - Lemon Splash",
    amount: "$48.14",
  },
  {
    date: "08/27/2022",
    note: "Billo - Durban Diesel",
    amount: "$35.72",
  },
  {
    date: "08/26/2022",
    note: "Billo - Sour Peach Lemonade Gummies",
    amount: "$33.59",
  },
];

// tempData
type MenuLink = {
  id: number;
  icon: string;
  href: string;
  label: string;
};

export const menuLinks: MenuLink[] = [
  {
    id: 1,
    icon: qrCode,
    href: "/pay/scan",
    label: "Scan to pay",
  },
  {
    id: 2,
    icon: wallet,
    href: "/pay/wallet",
    label: "Payment methods",
  },
  {
    id: 3,
    icon: receipt,
    href: "/pay/transactions",
    label: "Transactions",
  },
];
