import { wallet, qrCode, receipt } from "ionicons/icons";

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
